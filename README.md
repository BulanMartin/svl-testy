# SVL / studovna

Česká aplikace na procvičování otázek: výběr jednoho, více nebo všech okruhů, hledání, délka testu, náhodné pořadí, závěrečná statistika, vysvětlení a opakování chyb. Bez účtu, odpovědi se nikam neodesílají. Obnovení stránky ukončí rozpracovaný test.

## Přidání okruhu

Vložte nový `.yaml` nebo `.yml` soubor do složky `questions` a commitněte jej do `main`. GitHub Actions automaticky zkontroluje všechny otázky a publikuje web. Není potřeba měnit seznam souborů ani aplikaci. Lokální původní složka na počítači se sama nesynchronizuje; nové soubory je nutné přidat do repozitáře.

```yaml
schema_version: "1.0"
language: cs
topic:
  id: novy_okruh
  title: Nový okruh
  source:
    file: podklad.pdf
    year: 2026
questions:
  - id: novy_okruh_001
    type: single_choice
    question: Text otázky?
    options:
      - id: a
        text: První odpověď
      - id: b
        text: Druhá odpověď
    correct_option_id: a
    explanation: Vysvětlení správné odpovědi.
    source_pages: [1]
```

ID okruhu i otázky musí být jedinečné. Podporovány jsou otázky `single_choice`. Chybný YAML zastaví publikování s názvem problematického souboru; dosavadní web zůstane dostupný.

## Lokální spuštění

Vyžaduje Node.js 22 nebo novější:

```
npm ci
node scripts/build.mjs
python -m http.server 4173 --directory dist
```

Otevřete http://localhost:4173. V GitHub Settings → Pages nastavte Source na GitHub Actions.

Obsah otázek je převzatý z dodaných podkladů bez medicínské revize. Výsledky slouží k procvičování těchto podkladů.
