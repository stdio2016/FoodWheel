from flask import Flask, request, redirect, url_for, send_file, send_from_directory, render_template
import json
import time
import math
from restaurantfind import RestaurantFinder
get_restaurant = RestaurantFinder('restaurant.tsv')

app = Flask(__name__, static_url_path='/')
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/<filename>')
def all_files(filename):
    return send_from_directory('public', filename)

@app.after_request
def add_header(response):
    response.cache_control.max_age = 300
    return response

@app.route('/')
def home_page():
    return all_files('index.html')

@app.route('/api/wheelresult', methods=['POST'])
def api_wheelresult():
    print(request.data)
    return request.data

@app.route('/api/getrestaurant', methods=['POST'])
def api_getrestaurant():
    req = json.loads(request.data)
    print(req)
    return {
        'restaurants': get_restaurant.search(req['eatAtWhere'], req['eatWhat'], req['eatRequire'])
    }

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3230, debug=False)
