from database import conectar
from datetime import date


def converter_preco(preco):

    try:

        return float(
            preco
            .replace("R$", "")
            .replace(".", "")
            .replace(",", ".")
            .strip()
        )

    except:

        return 0


def salvar_resultados(resultados):

    conexao = conectar()

    cursor = conexao.cursor()

    for item in resultados:

        sql = """
        INSERT INTO RESULTADO_PESQUISA
        (
            SITE_PESQUISA,
            TITULO_ANUNCIO,
            DESCRICAO_ANUNCIO,
            DESCRICAO_PRODUTO,
            PRECO,
            URL_PRODUTO,
            DATA_RESULTADO,
            STATUS_VALIDACAO,
            ID_PESQUISA_PRODUTO
        )
        VALUES
        (
            %s,%s,%s,%s,%s,%s,%s,%s,%s
        )
        """

        valores = (

            item["site"],

            item["nome"],

            item["nome"],

            item["nome"],

            converter_preco(
                item["preco"]
            ),

            item["link"],

            date.today(),

            "PENDENTE",

            1
        )

        cursor.execute(
            sql,
            valores
        )

    conexao.commit()

    cursor.close()

    conexao.close()

    print(
        f"{len(resultados)} produtos salvos."
    )