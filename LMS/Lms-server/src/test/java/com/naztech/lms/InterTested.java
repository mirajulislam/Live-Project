package com.naztech.lms;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class InterTested {
	
	private static Logger log = LogManager.getLogger(InterTested.class);

	@Test
	void testFinnance() {
		
		double pv_a = 400000;
		double emi = getInstallAmount(pv_a, .135, 12, 3);
		double pv_a_system = getPrincipleAmount(emi, .135, 12, 3);
		log.info("pv_a, pv_a_system, emi => [{}]/[{}]/[{}]", pv_a, pv_a_system, emi);
		assertEquals(pv_a, pv_a_system);
	}

	public static double getInstallAmount(final double pv_a, final double r, final double m, double n) {
		double multiInstalYear = m * n;
		double rateByMulti = r / m;
		//
		return pv_a / ((1 - (1 / Math.pow((1 + rateByMulti), multiInstalYear))) / rateByMulti);

	}

	public static double getPrincipleAmount(double emi, double r, double m, double n) {

		double multiInstalYear = m * n;
		double rateByMulti = r / m;

		return emi * ((1 - (1 / Math.pow((1 + rateByMulti), multiInstalYear))) / rateByMulti);
	}

	public static void applicationNumber() {
		String s = String.format("%4s", "1").replace(' ', '0');
		System.out.println(s);
	}

	public static void mainX(String[] args) {
		applicationNumber();
	}

}
