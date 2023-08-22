from flask import jsonify
from .exceptions import CustomError

def register_error_handlers(app):

    @app.errorhandler(CustomError)
    def handle_custom_error(error):
        response = jsonify({
            'message': error.message
        })
        response.status_code = error.status_code
        return response
    
    # Add more error handlers if needed
