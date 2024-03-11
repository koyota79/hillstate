from flask import Flask 
from flask_restx import Resource, Api 
from flask_cors import CORS
from controllers.MainController import mainHome
from controllers.SiteMapController import siteMap

app = Flask(__name__)
CORS(app)  #
api = Api(app)



api.add_namespace(mainHome, '/')
api.add_namespace(siteMap, '/site_map')

# @app.route('/')
# def mainHome():
#     return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
