import json
import warnings
import numpy as np
from flask import Flask
from flask import jsonify
from flask_cors import CORS 
warnings.filterwarnings("ignore")
from datetime import datetime, timedelta
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model


app=Flask(__name__)
CORS(app)

#--------------------------------------------------------------------------#
#--------------------------------------------------------------------------#
#--------------------------------------------------------------------------#



@app.route("/api/<name>", methods = ['GET'])
def abc(name):
    company = name
    minDates , minStocks , nextTime = getDetailedMinData(company)

    myAll = {
                'minDates'  : minDates,#done
                'minStocks' : minStocks,#done
                'min15Date' : nextTime,
            }
    print(myAll)

    return json.dumps(myAll)


if __name__ == "__main__":
    app.run(debug=True)
