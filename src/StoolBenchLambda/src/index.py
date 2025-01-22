import json
import healthCheckHandler
import benchHandler
from constants import HTTP_CLIENT_ERROR

'''
This is the entry point for StoolBench Lambda Function
'''
def handler(event, context):
    return routeEvent(event)
    

def routeEvent(event):
    if event['path'] == '/health' and event['httpMethod'] == 'GET':
        return healthCheckHandler.handle()
    elif event['path'] == '/bench' and event['httpMethod'] == 'POST':
        return benchHandler.handle(json.loads(event['body']))
    else:
        return {
        'statusCode': HTTP_CLIENT_ERROR,
        'body': json.dumps({
            'reason': 'Received improper request and no handler found.',
            'event': event
        })
    }