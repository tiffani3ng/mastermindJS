# Makefile for web deployment

all: PutHTML

PutHTML:
	cp mastermind.html /var/www/html/mastermindJS/
	cp mmStyle.css /var/www/html/mastermindJS/
	cp mmScript.js /var/www/html/mastermindJS/

	echo "Current contents of your HTML directory: "
	ls -l /var/www/html/mastermindJS/
