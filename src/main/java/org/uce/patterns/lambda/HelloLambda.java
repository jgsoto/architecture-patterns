package org.uce.patterns.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.Map;

public class HelloLambda implements RequestHandler<Map<String, String>, String> {

    @Override
    public String handleRequest(
            Map<String, String> event,
            Context context) {

        String name = event.getOrDefault("name", "Mundo");

        return "Hola " + name
                + "! Esta respuesta fue generada por AWS Lambda.";
    }
}
