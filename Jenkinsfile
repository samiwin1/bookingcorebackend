stage('Build with Docker Compose and Push to Docker Hub') {
    steps {
        script {
            // Use Docker Compose to build the application
            bat 'docker-compose -f ./docker-compose.yml up --build -d'

            // Push your production Docker image to Docker Hub
            bat 'docker push samiwin/booking-app:1.2'
        }
    }
}
