package org.uce.patterns.service;

import io.github.resilience4j.circuitbreaker.CallNotPermittedException;
import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class CircuitBreakerService {

    private final CircuitBreaker circuitBreaker;

    public CircuitBreakerService() {

        CircuitBreakerConfig config =
                CircuitBreakerConfig.custom()
                        .slidingWindowSize(3)
                        .minimumNumberOfCalls(3)
                        .failureRateThreshold(100)
                        .waitDurationInOpenState(
                                Duration.ofSeconds(10))
                        .build();

        this.circuitBreaker =
                CircuitBreaker.of("demoCircuit", config);
    }

    public String execute() {

        return circuitBreaker.executeSupplier(() -> {
            throw new RuntimeException(
                    "El servicio externo no está disponible");
        });
    }

    public String getState() {
        return circuitBreaker.getState().name();
    }
}
