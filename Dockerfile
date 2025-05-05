#Use official Nginx image
FROM nginx:alpine

#Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

#Copy build files from local dist folder
COPY dist/ /usr/share/nginx/html

#Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf
