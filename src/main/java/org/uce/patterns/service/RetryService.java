package org.uce.patterns.service;

import io.github.resilience4j.retry.Retry;
import io.github.resilience4j.retry.RetryConfig;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class RetryService {

    public String execute() {

        AtomicInteger attempts = new AtomicInteger(0);

        RetryConfig config = RetryConfig.custom()
                .maxAttempts(3)
                .waitDuration(Duration.ofMillis(500))
                .build();

        Retry retry = Retry.of("demoRetry", config);

        return Retry.decorateSupplier(retry, () -> {

            int attempt = attempts.incrementAndGet();

            System.out.println("Intento: " + attempt);

            if (attempt < 3) {
                throw new RuntimeException(
                        "Error temporal de conexión");
            }

            return "Hola Mundo: conexión exitosa "
                    + "en el intento " + attempt;

        }).get();
    }
}
