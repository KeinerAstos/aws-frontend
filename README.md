# 🚀 AWS Frontend – Proyecto Dockerizado con Nginx

![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)
![Nginx](https://img.shields.io/badge/Nginx-Alpine-green?logo=nginx)
![Frontend](https://img.shields.io/badge/HTML-CSS-JS-orange)
![Status](https://img.shields.io/badge/Project-Live-success)

---

# 📁 Estructura del Proyecto

aws-frontend/
│
├── public/
│ ├── index.html
│ ├── styles.css
│ ├── script.js
│ └── nginx.conf
│
├── Dockerfile
├── docker-compose.yml
├── .gitignore
└── README.md

---

# 🐳 Docker

## 🔨 Construir la imagen

````bash
docker build -t aws-frontend .

▶️ Ejecutar el contenedor
docker run -d -p 8080:80 aws-frontend

Abrir en el navegador:

👉 http://localhost:8080

🐳 Docker Compose (opción recomendada)
docker-compose up -d --build


Abrir:

👉 http://localhost:8080

🌐 Despliegue en AWS EC2 (Ubuntu)
1️⃣ Instalar Docker
sudo apt update
sudo apt install docker.io -y
sudo systemctl enable docker
sudo usermod -aG docker ubuntu


Salir y volver a entrar.

2️⃣ Clonar el proyecto
git clone https://github.com/TU_USUARIO/aws-frontend.git
cd aws-frontend

3️⃣ Construir y ejecutar
docker build -t aws-frontend .
docker run -d -p 80:80 aws-frontend


Abrir en:
👉 http://IP_PUBLICA_DE_TU_EC2

🚀 Listo para producción

La app está completamente lista para:

✔️ EC2
✔️ Lightsail
✔️ ECS
✔️ Docker Desktop
✔️ Servidores Linux con Docker

📬 Autor

Proyecto desarrollado por keiner y sebastian Incluye Docker, Nginx y estructura optimizada para despliegue.


---

# ✅ **6. COMANDOS FINALES PARA SUBIR TODO A GITHUB**

Asegúrate de estar en la carpeta `aws-frontend`.

### 1️⃣ Inicializar git

```bash
git init

2️⃣ Añadir todos los archivos
git add .

3️⃣ Primer commit
git commit -m "Frontend dockerizado listo para producción"

4️⃣ Crear el repo en GitHub

Ve a:
🔗 https://github.com/KeinerAstos/aws-frontend



5️⃣ Conectar el repositorio remoto

git remote add origin https://github.com/KeinerAstos/aws-frontend



6️⃣ Subir el proyecto completo

git branch -M main
git push -u origin main
````
