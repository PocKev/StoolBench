import json
import time
import constants

def handle():
    timestamp = time.time()
    return constants.Helper.buildResponse(
        constants.StatusCode.HTTP_SUCCESS,
        json.dumps({
            'status': 'Service is healthy',
            'timestamp': timestamp
        })
    )