from enum import Enum, unique

@unique
class StatusCode(int, Enum):
    HTTP_SUCCESS: int = 200
    HTTP_CLIENT_ERROR: int = 400
    HTTP_SERVER_ERROR: int = 500

class Helper:
    def buildResponse(statusCode: StatusCode, body: str):
        return {
        'statusCode': statusCode,
        'body': body,
        'isBase64Encoded': False,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'OPTIONS,GET,PUT,POST,DELETE',
        }
    }