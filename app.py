from flask import Flask, render_template, request

from americanas import buscar_americanas
from salvar_resultados import salvar_resultados

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def home():

    resultados = []

    if request.method == "POST":

        produto = request.form.get("produto")

        if produto:

            resultados = buscar_americanas(produto)

            if resultados:
                salvar_resultados(resultados)

    return render_template(
        "index.html",
        resultados=resultados
    )


if __name__ == "__main__":
    app.run(debug=True)