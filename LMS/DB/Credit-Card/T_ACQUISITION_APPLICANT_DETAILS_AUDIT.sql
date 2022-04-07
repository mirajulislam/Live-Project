/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islam
* Date          : 02 JAN 2022
* Description   : Table for Acquisition Applicant Details
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_ACQUISITION_APPLICANT_DETAILS_AUDIT};
#define _PRIMARY_KEY		{id_acquisition_applicant_key};
#define _VERSION			{id_acquisition_applicant_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	_PRIMARY_KEY					 						INT							NOT NULL
, 	_VERSION					  	 						INT						    NOT NULL

,	is_active												INT                    		NOT NULL
,	id_env_key												INT                    		NOT NULL
,	id_user_mod_key											INT                    		NOT NULL
,	dtt_mod													DATETIME        			NOT NULL
,	dtt_create												DATETIME        			NOT NULL	
,	id_event_key											INT                    		NOT NULL
,	id_creator_key											INT                    		NOT NULL
, 	id_supplement_and_refer_key                     		INT                    		NOT NULL
, 	id_credit_card_key                     					INT                    		NOT NULL
,	tx_applicant_tid 										VARCHAR(256)                NOT NULL
,	tx_applicant_customer_type 								VARCHAR(256)                NOT NULL
,	tx_applicant_account_number 							VARCHAR(256)                NOT NULL
,	tx_applicant_nid_number 								VARCHAR(256)                NOT NULL
,	tx_applicant_bp_number 									VARCHAR(256)                NOT NULL
,	tx_applicant_applying_for 								VARCHAR(256)                NOT NULL
,	tx_applicant_typeof_card 								VARCHAR(256)                NOT NULL
,	tx_applicant_name 										VARCHAR(256)                NOT NULL
,	tx_applicant_gender_neutral_title 						VARCHAR(256)                NOT NULL
,	tx_applicant_nameon_card 								VARCHAR(256)                NOT NULL
,	tx_applicant_namein_bangla 								NVARCHAR(256)                NOT NULL
,	tx_applicant_nationality 								VARCHAR(256)                NOT NULL
,	tx_applicant_specify_nationality 						VARCHAR(256)                NOT NULL
,	tx_applicant_profession 								VARCHAR(256)                NOT NULL
,	dtt_applicant_dateof_birth 								DATETIME        			NOT NULL
,	tx_applicant_etin_number 								VARCHAR(256)                NOT NULL
,	tx_applicant_gender 									VARCHAR(256)                NOT NULL
,	tx_applicant_mobile_number 								VARCHAR(256)                NOT NULL
,	tx_applicant_other_photoid 								VARCHAR(256)                NOT NULL
,	tx_applicant_passportno 								VARCHAR(256)                NOT NULL
,	tx_applicant_id_issue_country 							VARCHAR(256)                NOT NULL
,	dtt_applicant_id_issue_date 							DATETIME        			NOT NULL
,	dtt_applicant_id_issue_date_exp 						DATETIME       				NOT NULL
,	tx_applicant_father_name 								VARCHAR(256)                NOT NULL
,	tx_applicant_mother_name 								VARCHAR(256)                NOT NULL
,	tx_applicant_spouse_name 								VARCHAR(256)                NOT NULL
,	tx_applicant_spouse_mobile_no 							VARCHAR(256)                NOT NULL
,	tx_applicant_marital_status 							VARCHAR(256)                NOT NULL
,	tx_applicant_marital_status_others 						VARCHAR(256)                NOT NULL
,	tx_applicant_noof_dependents 							VARCHAR(256)                NOT NULL
,	tx_applicant_highest_education 							VARCHAR(256)                NOT NULL
,	tx_applicant_highest_education_others 					VARCHAR(256)                NOT NULL
,	tx_applicant_resi_status 								VARCHAR(256)                NOT NULL
,	tx_applicant_resi_address 								VARCHAR(256)                NOT NULL
,	tx_applicant_resi_near_landmark 						VARCHAR(256)                NOT NULL
,	tx_applicant_resi_address_ps 							VARCHAR(256)                NOT NULL
,	tx_applicant_resi_address_post_code 					VARCHAR(256)                NOT NULL
,	tx_applicant_resi_address_district 						VARCHAR(256)                NOT NULL
,	tx_applicant_resi_address_country 						VARCHAR(256)                NOT NULL
,	tx_applicant_per_address 								VARCHAR(256)                NOT NULL
,	tx_applicant_per_address_near_land 						VARCHAR(256)                NOT NULL
,	tx_applicant_per_address_ps 							VARCHAR(256)                NOT NULL
,	tx_applicant_per_address_post_code 						VARCHAR(256)                NOT NULL
,	tx_applicant_per_address_district 						VARCHAR(256)                NOT NULL
,	tx_applicant_per_address_country 						VARCHAR(256)                NOT NULL
,	tx_applicant_occupation 								VARCHAR(256)                NOT NULL
,	tx_applicant_occupation_others 							VARCHAR(256)                NOT NULL
,	tx_applicant_company_name 								VARCHAR(256)                NOT NULL
,	tx_applicant_designation 								VARCHAR(256)                NOT NULL
,	tx_applicant_department 								VARCHAR(256)                NOT NULL
,	tx_applicant_nature_of_business 						VARCHAR(256)                NOT NULL
,	tx_applicant_employee_id 								VARCHAR(256)                NOT NULL
,	tx_applicant_office_address 							VARCHAR(256)                NOT NULL
,	tx_applicant_office_address_ps 							VARCHAR(256)                NOT NULL
,	tx_applicant_office_address_post_code 					VARCHAR(256)                NOT NULL
,	tx_applicant_office_address_district 					VARCHAR(256)                NOT NULL
,	tx_applicant_office_address_country 					VARCHAR(256)                NOT NULL
,	tx_applicant_employee_status 							VARCHAR(256)                NOT NULL
,	tx_applicant_business_established 						VARCHAR(256)                NOT NULL
,	tx_applicant_dur_in_currentjob_year 					VARCHAR(256)                NOT NULL
,	tx_applicant_dur_in_currentjob_month 					VARCHAR(256)                NOT NULL
,	tx_applicant_total_work_expyear 						VARCHAR(256)                NOT NULL
,	tx_applicant_total_work_expmonth 						VARCHAR(256)                NOT NULL
,	tx_applicant_office_phoneno 							VARCHAR(256)                NOT NULL
,	tx_applicant_mobileno 									VARCHAR(256)                NOT NULL
,	tx_applicant_mailing_com_address 						VARCHAR(256)                NOT NULL
,	tx_applicant_card_receiving_way_name 					VARCHAR(256)                NOT NULL
,	tx_applicant_card_receiving_way 						VARCHAR(256)                NOT NULL
,	tx_applicant_monthly_statements_sentWay 				VARCHAR(256)                NOT NULL
,	tx_applicant_prom_activit_purpose_id 					VARCHAR(256)                NOT NULL
,	dec_applicant_additional_income 						DECIMAL(20, 2) 				NOT NULL
,	dec_applicant_spouse_income 							DECIMAL(20, 2)   			NOT NULL
,	dec_salaried_month_gross_salary 						DECIMAL(20, 2) 				NOT NULL
,	dec_salaried_month_total_deduction 						DECIMAL(20, 2) 				NOT NULL
,	dec_salaried_month_net_income 							DECIMAL(20, 2) 				NOT NULL
,	dec_nonsalaried_month_gross_salary 						DECIMAL(20, 2) 				NOT NULL
,	dec_non_salaried_month_total_expense 					DECIMAL(20, 2) 				NOT NULL
,	dec_non_salaried_month_net_income 						DECIMAL(20, 2) 				NOT NULL
,	dec_demand_promissory_taka 								DECIMAL(20, 2) 				NOT NULL
,	dtt_demand_promissory_date 								DATETIME       				NOT NULL
,	tx_demand_promissory_place 								VARCHAR(256)   				NOT NULL
,	tx_demand_promissory_message 							VARCHAR(256)   				NOT NULL
,	dec_demand_promissory_second_taka 						DECIMAL(20, 2) 				NOT NULL
,	int_demand_promissory_rate								INT            				NOT NULL
,	tx_bank_branch_name 									VARCHAR(256)   				NOT NULL
,	int_bank_solid 											INT            				NOT NULL
,	tx_bank_geo_location_check1 							VARCHAR(256)                NOT NULL
,	tx_bank_geo_location_text1 								VARCHAR(256)                NOT NULL
,	tx_bank_geo_location_text2 								VARCHAR(256)                NOT NULL
,	tx_bank_geo_location_check2 							VARCHAR(256)                NOT NULL
,	tx_source_comments 										VARCHAR(256)                NOT NULL
,	tx_applicant_postal_code 								VARCHAR(256)                NOT NULL
,	tx_applicant_address 									VARCHAR(256)                NOT NULL
,	tx_applicant_district 									VARCHAR(256)                NOT NULL
,	tx_applicant_street_name 								VARCHAR(256)                NOT NULL
,	tx_applicant_streetno 									VARCHAR(256)                NOT NULL
,	tx_applicant_post_code 									VARCHAR(256)                NOT NULL
,	tx_applicant_district_of_birth 							VARCHAR(256)                NOT NULL
,	tx_applicant_country_of_birth 							VARCHAR(256)                NOT NULL
,	tx_applicant_idno 										VARCHAR(256)                NOT NULL
,	tx_cib_subject_code 									VARCHAR(256)                NOT NULL
,	tx_fi_subject_code 										VARCHAR(256)                NOT NULL
,	tx_bank_name 											VARCHAR(256)                NOT NULL
,	tx_trade_name 											VARCHAR(256)                NOT NULL
,	tx_fi_code 												VARCHAR(256)                NOT NULL
,	tx_branch_code 											VARCHAR(256)                NOT NULL
,	tx_typeof_financing 									VARCHAR(256)                NOT NULL
,	dec_total_requested_amountor_creditlmt 					DECIMAL(20, 2)              NOT NULL
,	dtt_installment_contract_date 							DATETIME        			NOT NULL
,	dec_installment_amount 									DECIMAL(20, 2)              NOT NULL
,	tx_numof_installment 									VARCHAR(256)                NOT NULL
,	tx_payment_periodicity 									VARCHAR(256)                NOT NULL
,	tx_sector_type 											VARCHAR(256)                NOT NULL
,	tx_sector_code 											VARCHAR(256)                NOT NULL
,	tx_manager_sealan_signaure 								VARCHAR(256)                NOT NULL
,	tx_applicant_signature 									VARCHAR(256)                NOT NULL
,	tx_authorized_officer_seal_and_signaure					VARCHAR(256)                NOT NULL
,	tx_applicant_present_address_street_name 				VARCHAR(256)                NOT NULL
,	tx_applicant_present_address_street_num 				VARCHAR(256)                NOT NULL
,	tx_cif_no 												VARCHAR(256)                NOT NULL
,	tx_fund_source 											VARCHAR(256)                NOT NULL
,	dec_monthly_income 										DECIMAL(20, 2)              NOT NULL
,	tx_spouse_employment_status 							VARCHAR(256)                NOT NULL
,	tx_member_ship_of_club 									VARCHAR(256)                NOT NULL
,	tx_specify_club_name 									VARCHAR(256)                NOT NULL
,	tx_you_are_verified_customer 							VARCHAR(256)                NOT NULL
,	dec_house_rent_range 									DECIMAL(20, 2)              NOT NULL
,	tx_have_customer_own_car 								VARCHAR(256)                NOT NULL
,	tx_car_brand_name 										VARCHAR(256)                NOT NULL
,	dec_travel_yearly_number 								DECIMAL(20, 2)                NOT NULL
,	tx_passport_number_indentity 							VARCHAR(256)                NOT NULL
,	tx_nid_indetity 										VARCHAR(256)                NOT NULL
,	tx_etin_id_identity 									VARCHAR(256)                NOT NULL
,	tx_politically_exposed_person 							VARCHAR(256)                NOT NULL
,	tx_you_are_senior_managment 							VARCHAR(256)                NOT NULL
,	tx_you_are_face_to_face_interview 						VARCHAR(256)                NOT NULL
,	tx_you_are_terrorist_activities 						VARCHAR(256)                NOT NULL
,	tx_you_are_terrorist_activitie_regard 					VARCHAR(256)                NOT NULL
,	tx_exception_details 									VARCHAR(256)                NOT NULL
,	dec_applicant_asking_limit 								DECIMAL(20, 2)  			NOT NULL
,	dec_applicant_recommended_limit 						DECIMAL(20, 2)  			NOT NULL
,	tx_interviewed_source_sign 								VARCHAR(256)                NOT NULL
,	tx_managerOr_unit_head_sign 							VARCHAR(256)                NOT NULl
,	tx_you_are_cbbl_account_holder 							VARCHAR(256)                NOT NULl
,	tx_auto_pay_instruction 								VARCHAR(256)                NOT NULl
,	tx_applicant_usd_account_portion 						VARCHAR(256)                NOT NULl
,	tx_other_bank_liability_position						VARCHAR(256)                NOT NULL
,	tx_other_bankacc_details								VARCHAR(256)                NOT NULL
,	tx_card_state_name 										VARCHAR(256)                NOT NULL
,	int_card_state_id 										INT            				NOT NULL
,	tx_passport_number_obtained								VARCHAR(256)                NOT NULL
,	tx_passport_number_verified								VARCHAR(256)                NOT NULL
,	tx_nid_indetity_obtained								VARCHAR(256)                NOT NULL
,	tx_nid_indetity_verified								VARCHAR(256)                NOT NULL
,	tx_etin_id_identity_obtained							VARCHAR(256)                NOT NULL
,	tx_etin_id_identity_verified							VARCHAR(256)                NOT NULL
,   tx_payment_type_of_standing_instruction                 VARCHAR(256)                NOT NULL
,   tx_payment_type_of_standing_instruction1                VARCHAR(256)                NOT NULL
,	tx_applicant_id_type 									VARCHAR(256)                NOT NULL
,	tx_applicant_other_id 									VARCHAR(256)                NOT NULL
,	tx_business_address										VARCHAR(256)                NOT NULL
,	tx_business_district									VARCHAR(256)                NOT NULL	
,	tx_business_street_name									VARCHAR(256)                NOT NULL	
,	tx_business_street_number								VARCHAR(256)                NOT NULL		
,	tx_business_postal_code									VARCHAR(256)                NOT NULL	
,	tx_business_country										VARCHAR(256)                NOT NULL
,	tx_applicant_owner_partner								VARCHAR(256)                NOT NULL
,	tx_applicant_per_street_no								VARCHAR(256)                NOT NULL
,	tx_applicant_per_street_name							VARCHAR(256)                NOT NULL	
)

go

_GRANT_PERM_TBL