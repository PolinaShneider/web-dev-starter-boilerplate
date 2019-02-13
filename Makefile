MODULES  = ./node_modules/.bin
PARCEL  = $(MODULES)/parcel

ENTRY_POINT = src/markup/index.html
PUBLIC_DIR = public

develop: ## develop source 🎨
	$(PARCEL) $(ENTRY_POINT) --out-dir $(PUBLIC_DIR) -p 1987
