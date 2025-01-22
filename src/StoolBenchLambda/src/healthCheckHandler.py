import json
import time
from constants import HTTP_SUCCESS

def handle():
    timestamp = time.time()
    return {
        'statusCode': HTTP_SUCCESS,
        'body': json.dumps({
            'status': 'Service is healthy',
            'timestamp': timestamp
        })
    }