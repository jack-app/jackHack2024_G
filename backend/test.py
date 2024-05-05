import mysql.connector
from mysql.connector import Error
import os
import random
from datetime import datetime

def generate_time():
    pickup_time = datetime.now()
    return pickup_time

print(generate_time())