package com.example.server;

import java.util.List;
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

import com.example.server.scrape.Scraper;
import com.example.server.scrape.WikiData;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class Controller {
    @Autowired
    private NationService nationService;

	@Autowired
	private VehicleService vehicleService;

	@Autowired
	private Scraper scraper;

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
	public ResponseEntity<List<NationData>> getNationData(@RequestParam String mode, @RequestParam String brRange, @RequestParam String nation, @RequestParam String cls, @RequestParam String output, @RequestParam Double lowerBr) {
		// TODO: add ouput for x and y axis separatly
		List<NationData> returnValue = nationService.getNationData(mode, brRange, cls, nation, output, lowerBr);
		return new ResponseEntity<List<NationData>>(returnValue, returnValue.isEmpty()?HttpStatus.NO_CONTENT: HttpStatus.OK);
	}

	@GetMapping("/vehicleList")
	public ResponseEntity<List<VehicleName>> getVehicleList(@RequestParam String nation, @RequestParam String cls, @RequestParam String mode, @RequestParam Double lowerBr, @RequestParam Double upperBr) {
		return new ResponseEntity<List<VehicleName>>(vehicleService.getVehicleList(nation, cls, mode, lowerBr, upperBr), HttpStatus.OK);
	}

	@GetMapping("/vehicleBrList")
	public ResponseEntity<List<Double>> getVehicleBr(@RequestParam String mode) {
		return new ResponseEntity<>(vehicleService.getBrList(mode), HttpStatus.OK);
	}

	@GetMapping("/vehicleData")
	public ResponseEntity<List<VehicleData>> getVehicleData(@RequestParam String name, @RequestParam String outputX, @RequestParam String outputY) {
		return new ResponseEntity<>(vehicleService.getVehicleData(name, outputX, outputY), HttpStatus.OK);
	}
	
	@GetMapping("/vehicleDataWithCount")	
	public ResponseEntity<List<VehicleDataWithCount>> getVehicleDataWithCount(@RequestParam String name, @RequestParam String outputX, @RequestParam String outputY) {
		return new ResponseEntity<>(vehicleService.getVehicleDataWithCount(name, outputX, outputY), HttpStatus.OK);
	}

	@GetMapping("/vehicleRandomOutput")
	public ResponseEntity<List<VehicleData>> getVehicleRandomOutput(@RequestParam String name) {
		return new ResponseEntity<>(vehicleService.getVehicleRandomOutput(name), HttpStatus.OK);
	}

	@GetMapping("/randomVehicle")
	public ResponseEntity<VehicleName> getRandomVehicle() {
		return new ResponseEntity<>(vehicleService.getRandomVehicle(), HttpStatus.OK);
	}

	@GetMapping("/randomVehicleData")
	public ResponseEntity<VehicleDataWithInfo> getRandomVehicleData() {
		return new ResponseEntity<>(vehicleService.getRandomVehicleData(), HttpStatus.OK);
	}
	
	@GetMapping("/outputList")
	public ResponseEntity<List<String>> getOutputNames() {
		return new ResponseEntity<List<String>>(vehicleService.getOutputNames(), HttpStatus.OK);
	}

	@GetMapping("/wikiData")
	public ResponseEntity<WikiData> getWikiData(@RequestParam String name) {
		return new ResponseEntity<>(scraper.scrapeWTWiki(name), HttpStatus.OK);
	}
	
}
