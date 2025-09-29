import { NextRequest } from 'next/server';
import { analyzeWasteImage } from '../../../lib/gemini';
import { executeQuery } from '../../../lib/database';
import { getServerSession } from 'next-auth';

export async function POST(request) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { image } = await request.json();
    
    if (!image) {
      return Response.json({ error: 'No image provided' }, { status: 400 });
    }

    // Remove data:image/jpeg;base64, prefix if present
    const base64Image = image.replace(/^data:image\/[a-z]+;base64,/, '');


    // Analyze image with Gemini AI
    const analysisResult = await analyzeWasteImage(base64Image);

    // Error handling: jika tidak ada sampah terdeteksi atau waste_type tidak valid
    const validWasteTypes = ['organic', 'inorganic', 'hazardous'];
    if (!analysisResult || !analysisResult.wasteType || 
        !validWasteTypes.includes(analysisResult.wasteType.toLowerCase().trim())) {
      return Response.json({ error: 'Tidak ada sampah yang terdeteksi' }, { status: 200 });
    }

    // Save scan result to database
    const user = await executeQuery(
      'SELECT id FROM users WHERE email = ?',
      [session.user.email]
    );

    if (user.length > 0) {
      await executeQuery(`
        INSERT INTO scan_history (
          user_id, waste_type, item_name, category, bin_color, 
          disposal_tips, recyclable, decomposition_time, confidence, 
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `, [
        user[0].id,
        analysisResult.wasteType,
        analysisResult.itemName,
        analysisResult.category,
        analysisResult.binColor,
        analysisResult.disposalTips,
        analysisResult.recyclable,
        analysisResult.decompositionTime,
        analysisResult.confidence
      ]);

      // Update user stats
      await executeQuery(`
        INSERT INTO user_stats (user_id, total_scans, organic_count, inorganic_count, hazardous_count, updated_at)
        VALUES (?, 1, ?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE
        total_scans = total_scans + 1,
        organic_count = organic_count + ?,
        inorganic_count = inorganic_count + ?,
        hazardous_count = hazardous_count + ?,
        updated_at = NOW()
      `, [
        user[0].id,
        analysisResult.wasteType === 'organic' ? 1 : 0,
        analysisResult.wasteType === 'inorganic' ? 1 : 0,
        analysisResult.wasteType === 'hazardous' ? 1 : 0,
        analysisResult.wasteType === 'organic' ? 1 : 0,
        analysisResult.wasteType === 'inorganic' ? 1 : 0,
        analysisResult.wasteType === 'hazardous' ? 1 : 0,
      ]);
    }

    return Response.json(analysisResult);
  } catch (error) {
    console.error('Error in waste analysis:', error);
    return Response.json({ error: 'Analysis failed' }, { status: 500 });
  }
}