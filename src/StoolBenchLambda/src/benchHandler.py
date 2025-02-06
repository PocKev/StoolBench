import json
import time
import constants

def validateBody(body):
    pass

def handle(body: dict):
    validateBody(body)
    timestamp = body['timestamp'] \
        if 'timestamp' in body and body['timestamp'] is not None \
        else time.time()
    return constants.Helper.buildResponse(
        constants.StatusCode.HTTP_SUCCESS,
        json.dumps({
            'message': 'Successfully logged dump at {}.'.format(timestamp),
            'type': body['type']
        })
    )