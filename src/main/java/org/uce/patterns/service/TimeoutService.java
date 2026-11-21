package org.uce.patterns.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.*;

@Service
public class TimeoutService {

    public String execute() {

        ExecutorService executor =
                Executors.newSingleThreadExecutor();

        Future<String> future = executor.submit(() -> {

            Thread.sleep(5000);

            return "Hola Mundo: respuesta recibida";
        });

        try {

            return future.get(2, TimeUnit.SECONDS);

        } catch (TimeoutException e) {

            future.cancel(true);

            throw new RuntimeException(
                    "Timeout: se superó el tiempo máximo de espera");

        } catch (InterruptedException e) {

            Thread.currentThread().interrupt();

            throw new RuntimeException(
                    "La operación fue interrumpida");

        } catch (ExecutionException e) {

            throw new RuntimeException(
                    "Error al ejecutar la operación");

        } finally {

            executor.shutdownNow();
        }
    }
}
