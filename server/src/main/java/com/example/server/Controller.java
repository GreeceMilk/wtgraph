package com.example.server;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.nationrb.NationRb1;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class Controller {
    @Autowired
    private NationService nationService;

	@GetMapping("/nation")
	public ResponseEntity<Optional<Nation>> getNation(@RequestParam String mode, @RequestParam String brRange, @RequestParam ObjectId id) {
		Optional<Nation> returnValue = nationService.getNation(mode, brRange, id);
		return new ResponseEntity<Optional<Nation>>(returnValue, returnValue.isEmpty()?HttpStatus.NO_CONTENT: HttpStatus.OK);
	}

	@GetMapping("/nationList")
	public ResponseEntity<List<String>> getNationList(@RequestParam String mode, @RequestParam String brRange) {
		return new ResponseEntity<List<String>>(nationService.getNationList(mode, brRange), HttpStatus.OK);
	}

	@GetMapping("/clsList")
	public ResponseEntity<List<String>> getMethodName(@RequestParam String mode, @RequestParam String brRange, @RequestParam String nation) {
		return new ResponseEntity<List<String>>(nationService.getClsList(mode, brRange, nation), HttpStatus.OK);
	}
	
	@GetMapping("/brList")
	public ResponseEntity<List<Double>> getBrList(@RequestParam String mode, @RequestParam String brRange, @RequestParam String nation, @RequestParam String cls) {
		return new ResponseEntity<List<Double>>(nationService.getBrList(mode, brRange, nation, cls), HttpStatus.OK);
	}
	
	
	@GetMapping("/nationData")
	public ResponseEntity<List<NationData>> getNationData(@RequestParam String mode, @RequestParam String brRange, @RequestParam String nation, @RequestParam String cls, @RequestParam String output, @RequestParam Integer lowerBr) {
		//TODO: add time frame filler
		List<NationData> returnValue = nationService.getNationData(mode, brRange, cls, nation, output, lowerBr);
		return new ResponseEntity<List<NationData>>(returnValue, returnValue.isEmpty()?HttpStatus.NO_CONTENT: HttpStatus.OK);
	}

}
