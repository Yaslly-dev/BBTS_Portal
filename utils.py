import json


def salvar_json(dados, arquivo="resultados.json"):

    with open(
        arquivo,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            dados,
            f,
            ensure_ascii=False,
            indent=4
        )

    print(
        f"JSON salvo: {arquivo}"
    )