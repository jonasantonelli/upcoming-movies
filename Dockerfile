FROM php:7.2-fpm

RUN apt-get update -y \
    && apt-get install -y nginx

COPY nginx.conf /etc/nginx/sites-enabled/default
COPY --chown=www-data:www-data entrypoint.sh /etc/entrypoint.sh
COPY --chown=www-data:www-data api /var/www/html/api
COPY --chown=www-data:www-data app /var/www/html/app

WORKDIR /var/www/html
EXPOSE 80
ENTRYPOINT ["/etc/entrypoint.sh"]

#to build it
#docker build -t upcomingmovies:1 .

#to run
#docker run --rm -p 80:80 upcomingmovies:1 