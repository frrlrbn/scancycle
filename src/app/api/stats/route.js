import { executeQuery } from '../../../lib/database';
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await executeQuery(
      'SELECT id FROM users WHERE email = ?',
      [session.user.email]
    );

    if (user.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = user[0].id;

    // Get user stats
    const stats = await executeQuery(
      'SELECT * FROM user_stats WHERE user_id = ?',
      [userId]
    );

    // Get recent scan history with full details for modal
    const recentScans = await executeQuery(`
      SELECT 
        waste_type, 
        item_name, 
        category, 
        bin_color, 
        disposal_tips,
        recyclable,
        decomposition_time,
        confidence,
        created_at
      FROM scan_history 
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 10
    `, [userId]);

    // Get waste type distribution
    const distribution = await executeQuery(`
      SELECT 
        waste_type,
        COUNT(*) as count
      FROM scan_history 
      WHERE user_id = ?
      GROUP BY waste_type
    `, [userId]);

    return Response.json({
      stats: stats.length > 0 ? stats[0] : {
        total_scans: 0,
        organic_count: 0,
        inorganic_count: 0,
        hazardous_count: 0
      },
      recentScans,
      distribution
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    return Response.json({ error: 'Failed to get stats' }, { status: 500 });
  }
}