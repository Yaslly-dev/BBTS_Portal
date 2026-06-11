from americanas import buscar_americanas

produto = input("🔍 Digite o produto: ")

resultados = buscar_americanas(produto)

print("\n📊 RESULTADOS:\n")

for item in resultados:

    print(f"🏪 Site: {item['site']}")
    print(f"📦 Produto: {item['nome']}")
    print(f"💰 Preço: {item['preco']}")
    print(f"🔗 Link: {item['link']}")
    print("-" * 50)