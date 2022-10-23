package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repo.EmployeeRepo;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Employee;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepo employeeRepo;

	@GetMapping("/employees")
	public List<Employee> getAllEmployee(){
		return employeeRepo.findAll();
	}
	
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeRepo.save(employee);
	}
	
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
		Employee emp = employeeRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee does't exist! ID: "+id));
		return ResponseEntity.ok(emp);
	}
	
	@PutMapping(path="/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable("id") Long id,@RequestBody Employee employee){
		try {
			
			Employee emp = employeeRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee does't exist! ID: "+id));
			emp.setFirstName(employee.getFirstName());
			emp.setLastName(employee.getLastName());
			emp.setEmail(employee.getEmail());
			employeeRepo.save(emp);
			return ResponseEntity.ok(emp);
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable Long id){
		Employee emp = employeeRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee does't exist! ID: "+id));
		employeeRepo.delete(emp);
		Map<String,Boolean> response = new HashMap<>();		
		response.put("Del", Boolean.TRUE);
		return ResponseEntity.ok(response);
 	}
}
