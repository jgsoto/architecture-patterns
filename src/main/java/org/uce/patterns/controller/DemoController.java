package org.uce.patterns.controller;

import org.uce.patterns.service.CircuitBreakerService;
import org.uce.patterns.service.RetryService;
import org.uce.patterns.service.TimeoutService;
import org.uce.patterns.service.HubSpokeService;
import org.uce.patterns.lambda.HelloLambda;

import io.github.resilience4j.circuitbreaker.CallNotPermittedException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class DemoController {

    private final CircuitBreakerService circuitBreakerService;
    private final RetryService retryService;
    private final TimeoutService timeoutService;
    private final HubSpokeService hubSpokeService;

    public DemoController(
            CircuitBreakerService circuitBreakerService,
            RetryService retryService,
            TimeoutService timeoutService,
            HubSpokeService hubSpokeService) {

        this.circuitBreakerService = circuitBreakerService;
        this.retryService = retryService;
        this.timeoutService = timeoutService;
        this.hubSpokeService = hubSpokeService;
    }

    @GetMapping("/hello")
    public Map<String, String> hello() {

        return Map.of(
                "message", "Hello World!",
                "application", "Cloud Architecture Demo",
                "language", "Java"
        );
    }

    @GetMapping("/circuit-breaker")
    public ResponseEntity<Map<String, String>> circuitBreaker() {

        try {

            String result = circuitBreakerService.execute();

            return ResponseEntity.ok(Map.of(
                    "result", result,
                    "state", circuitBreakerService.getState()
            ));

        } catch (CallNotPermittedException e) {

            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Map.of(
                            "error", "Circuit abierto: solicitud bloqueada",
                            "state", circuitBreakerService.getState()
                    ));

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Map.of(
                            "error", e.getMessage(),
                            "state", circuitBreakerService.getState()
                    ));
        }
    }

    @GetMapping("/retry")
    public Map<String, String> retry() {

        return Map.of(
                "result", retryService.execute(),
                "pattern", "Retry Pattern"
        );
    }

    @GetMapping("/timeout")
    public ResponseEntity<Map<String, String>> timeout() {

        try {

            return ResponseEntity.ok(Map.of(
                    "result", timeoutService.execute()
            ));

        } catch (RuntimeException e) {

            return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT)
                    .body(Map.of(
                            "error", e.getMessage(),
                            "pattern", "Timeout Pattern"
                    ));
        }
    }

    @GetMapping("/hub-spoke")
    public Map<String, Object> hubSpoke() {

        return Map.of(
                "architecture", "Hub-and-Spoke",
                "messages", hubSpokeService.execute()
        );
    }

    @GetMapping("/lambda")
    public Map<String, String> lambda(
            @RequestParam(defaultValue = "Mundo") String name) {

        HelloLambda lambda = new HelloLambda();

        String result = lambda.handleRequest(
                Map.of("name", name),
                null
        );

        return Map.of(
                "function", "AWS Lambda",
                "result", result
        );
    }
}

