# Makefile for web deployment

all: PutHTML

PutHTML:
  cp mastermindJS.html /var/www/html/mastermindJS/
	cp style.css /var/www/html/mastermindJS/
	cp script.js /var/www/html/mastermindJS/

	echo "Current contents of your HTML directory: "
	ls -l /var/www/html/mastermindJS/
