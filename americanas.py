from playwright.sync_api import sync_playwright


def buscar_americanas(produto):

    resultados = []

    with sync_playwright() as p:

        browser = p.chromium.launch(
            headless=False
        )

        context = browser.new_context(

            viewport={
                "width": 1366,
                "height": 768
            },

            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 "
                "(KHTML, like Gecko) "
                "Chrome/122 Safari/537.36"
            )
        )

        page = context.new_page()

        url = (
            "https://www.americanas.com.br"
            f"/busca/{produto.replace(' ', '-')}"
        )

        print(f"ABRINDO: {url}")

        page.goto(
            url,
            timeout=30000,
            wait_until="domcontentloaded"
        )

        page.wait_for_timeout(5000)

        links = page.locator("a").evaluate_all(
            """
            elements => elements.map(el => ({
                texto: el.innerText,
                href: el.href
            }))
            """
        )

        print(
            f"LINKS ENCONTRADOS: {len(links)}"
        )

        links_usados = set()

        for item in links:

            try:

                texto = item["texto"]
                href = item["href"]

                if not texto:
                    continue

                if not href:
                    continue

                if href in links_usados:
                    continue

                if "R$" not in texto:
                    continue

                links_usados.add(href)

                linhas = texto.split("\n")

                nome = linhas[0]

                preco = "0"

                for linha in linhas:

                    if "R$" in linha:

                        preco = linha
                        break

                resultados.append({

                    "site": "Americanas",

                    "nome": nome,

                    "preco": preco,

                    "link": href

                })

            except Exception as erro:

                print(
                    "ERRO:",
                    erro
                )

        browser.close()

    print(
        f"TOTAL PRODUTOS: {len(resultados)}"
    )

    return resultados[:20]