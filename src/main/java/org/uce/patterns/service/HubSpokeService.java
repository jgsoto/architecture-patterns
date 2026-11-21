package org.uce.patterns.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HubSpokeService {

    public List<String> execute() {

        String spoke1 = "Mensaje recibido desde Spoke 1";
        String spoke2 = "Mensaje recibido desde Spoke 2";

        return List.of(
                "HUB: Centro de comunicación activo",
                "HUB: " + spoke1,
                "HUB: " + spoke2,
                "HUB: Mensajes procesados correctamente"
        );
    }
}
