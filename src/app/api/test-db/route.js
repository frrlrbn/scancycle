import { testConnection } from '../../../lib/database';

export async function GET() {
  try {
    const isConnected = await testConnection();
    
    if (isConnected) {
      return Response.json({ 
        status: 'success', 
        message: 'Database connection successful',
        timestamp: new Date().toISOString()
      });
    } else {
      return Response.json({ 
        status: 'error', 
        message: 'Database connection failed' 
      }, { status: 500 });
    }
  } catch (error) {
    return Response.json({ 
      status: 'error', 
      message: 'Database connection test failed',
      error: error.message 
    }, { status: 500 });
  }
}