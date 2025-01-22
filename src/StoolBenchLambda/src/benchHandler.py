import json
from constants import HTTP_SUCCESS

def validateBody(body):
    pass

def handle(body: dict):
    validateBody(body)
    return {
        'statusCode': HTTP_SUCCESS,
        'body': json.dumps({
            'status': 'Service is healthy',
            'message': body['message']
        })
    }