import mysql.connector


def conectar():

    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Yg76211267!",
        database="bbts"
    )