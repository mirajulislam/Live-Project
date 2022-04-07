/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul.islam
* Date          : 01 JAN 2022
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_acquisition_applicant_details};
#define _TABLE_NAME     {T_ACQUISITION_APPLICANT_DETAILS};
#define _PRIMARY_KEY    {id_acquisition_applicant_key};
#define _VERSION        {id_acquisition_applicant_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    , 	@_PRIMARY_KEY                     						INT                    		= NULL       OUTPUT
    , 	@_VERSION                         						INT                    		= NULL 

	,	@dtt_create												DATETIME        			= NULL	
	,	@id_creator_key											INT                    		= NULL
    , 	@id_supplement_and_refer_key                     		INT                    		= NULL
    , 	@id_credit_card_key                     				INT                    		= NULL
    ,	@tx_applicant_tid 										VARCHAR(256)                = NULL
	,	@tx_applicant_customer_type 							VARCHAR(256)                = NULL
	,	@tx_applicant_account_number 							VARCHAR(256)                = NULL
	,	@tx_applicant_nid_number 								VARCHAR(256)                = NULL
	,	@tx_applicant_bp_number 								VARCHAR(256)                = NULL
	,	@tx_applicant_applying_for 								VARCHAR(256)                = NULL
	,	@tx_applicant_typeof_card 								VARCHAR(256)                = NULL
	,	@tx_applicant_name 										VARCHAR(256)                = NULL
	,	@tx_applicant_gender_neutral_title 						VARCHAR(256)                = NULL
	,	@tx_applicant_nameon_card 								VARCHAR(256)                = NULL
	,	@tx_applicant_namein_bangla 							NVARCHAR(256)                = NULL
	,	@tx_applicant_nationality 								VARCHAR(256)                = NULL
	,	@tx_applicant_specify_nationality 						VARCHAR(256)                = NULL
	,	@tx_applicant_profession 								VARCHAR(256)                = NULL
	,	@dtt_applicant_dateof_birth 							DATETIME        			= NULL
	,	@tx_applicant_etin_number 								VARCHAR(256)                = NULL
	,	@tx_applicant_gender 									VARCHAR(256)                = NULL
	,	@tx_applicant_mobile_number 							VARCHAR(256)                = NULL
	,	@tx_applicant_other_photoid 							VARCHAR(256)                = NULL
	,	@tx_applicant_passportno 								VARCHAR(256)                = NULL
	,	@tx_applicant_id_issue_country 							VARCHAR(256)                = NULL
	,	@dtt_applicant_id_issue_date 							DATETIME        			= NULL
	,	@dtt_applicant_id_issue_date_exp 						DATETIME       				= NULL
	,	@tx_applicant_father_name 								VARCHAR(256)                = NULL
	,	@tx_applicant_mother_name 								VARCHAR(256)                = NULL
	,	@tx_applicant_spouse_name 								VARCHAR(256)                = NULL
	,	@tx_applicant_spouse_mobile_no 							VARCHAR(256)                = NULL
	,	@tx_applicant_marital_status 							VARCHAR(256)                = NULL
	,	@tx_applicant_marital_status_others 					VARCHAR(256)                = NULL
	,	@tx_applicant_noof_dependents 							VARCHAR(256)                = NULL
	,	@tx_applicant_highest_education 						VARCHAR(256)                = NULL
	,	@tx_applicant_highest_education_others 					VARCHAR(256)                = NULL
	,	@tx_applicant_resi_status 								VARCHAR(256)                = NULL
	,	@tx_applicant_resi_address 								VARCHAR(256)                = NULL
	,	@tx_applicant_resi_near_landmark 						VARCHAR(256)                = NULL
	,	@tx_applicant_resi_address_ps 							VARCHAR(256)                = NULL
	,	@tx_applicant_resi_address_post_code 					VARCHAR(256)                = NULL
	,	@tx_applicant_resi_address_district 					VARCHAR(256)                = NULL
	,	@tx_applicant_resi_address_country 						VARCHAR(256)                = NULL
	,	@tx_applicant_per_address 								VARCHAR(256)                = NULL
	,	@tx_applicant_per_address_near_land 					VARCHAR(256)                = NULL
	,	@tx_applicant_per_address_ps 							VARCHAR(256)                = NULL
	,	@tx_applicant_per_address_post_code 					VARCHAR(256)                = NULL
	,	@tx_applicant_per_address_district 						VARCHAR(256)                = NULL
	,	@tx_applicant_per_address_country 						VARCHAR(256)                = NULL
	,	@tx_applicant_occupation 								VARCHAR(256)                = NULL
	,	@tx_applicant_occupation_others 						VARCHAR(256)                = NULL
	,	@tx_applicant_company_name 								VARCHAR(256)                = NULL
	,	@tx_applicant_designation 								VARCHAR(256)                = NULL
	,	@tx_applicant_department 								VARCHAR(256)                = NULL
	,	@tx_applicant_nature_of_business 						VARCHAR(256)                = NULL
	,	@tx_applicant_employee_id 								VARCHAR(256)                = NULL
	,	@tx_applicant_office_address 							VARCHAR(256)                = NULL
	,	@tx_applicant_office_address_ps 						VARCHAR(256)                = NULL
	,	@tx_applicant_office_address_post_code 					VARCHAR(256)                = NULL
	,	@tx_applicant_office_address_district 					VARCHAR(256)                = NULL
	,	@tx_applicant_office_address_country 					VARCHAR(256)                = NULL
	,	@tx_applicant_employee_status 							VARCHAR(256)                = NULL
	,	@tx_applicant_business_established 						VARCHAR(256)                = NULL
	,	@tx_applicant_dur_in_currentjob_year 					VARCHAR(256)                = NULL
	,	@tx_applicant_dur_in_currentjob_month 					VARCHAR(256)                = NULL
	,	@tx_applicant_total_work_expyear 						VARCHAR(256)                = NULL
	,	@tx_applicant_total_work_expmonth 						VARCHAR(256)                = NULL
	,	@tx_applicant_office_phoneno 							VARCHAR(256)                = NULL
	,	@tx_applicant_mobileno 									VARCHAR(256)                = NULL
	,	@tx_applicant_mailing_com_address 						VARCHAR(256)                = NULL
	,	@tx_applicant_card_receiving_way_name 					VARCHAR(256)                = NULL
	,	@tx_applicant_card_receiving_way 						VARCHAR(256)                = NULL
	,	@tx_applicant_monthly_statements_sentWay 				VARCHAR(256)                = NULL
	,	@tx_applicant_prom_activit_purpose_id 					VARCHAR(256)                = NULL
	,	@dec_applicant_additional_income 						DECIMAL(20, 2) 				= NULL
	,	@dec_applicant_spouse_income 							DECIMAL(20, 2)   			= NULL
	,	@dec_salaried_month_gross_salary 						DECIMAL(20, 2) 				= NULL
	,	@dec_salaried_month_total_deduction 					DECIMAL(20, 2) 				= NULL
	,	@dec_salaried_month_net_income 							DECIMAL(20, 2) 				= NULL
	,	@dec_nonsalaried_month_gross_salary 					DECIMAL(20, 2) 				= NULL
	,	@dec_non_salaried_month_total_expense 					DECIMAL(20, 2) 				= NULL
	,	@dec_non_salaried_month_net_income 						DECIMAL(20, 2) 				= NULL
	,	@dec_demand_promissory_taka 							DECIMAL(20, 2) 				= NULL
	,	@dtt_demand_promissory_date 							DATETIME       				= NULL
	,	@tx_demand_promissory_place 							VARCHAR(256)   				= NULL
	,	@tx_demand_promissory_message 							VARCHAR(256)   				= NULL
	,	@dec_demand_promissory_second_taka 						DECIMAL(20, 2) 				= NULL
	,	@int_demand_promissory_rate								INT            				= NULL
	,	@tx_bank_branch_name 									VARCHAR(256)   				= NULL
	,	@int_bank_solid 										INT            				= NULL
	,	@tx_bank_geo_location_check1 							VARCHAR(256)                = NULL
	,	@tx_bank_geo_location_text1 							VARCHAR(256)                = NULL
	,	@tx_bank_geo_location_text2 							VARCHAR(256)                = NULL
	,	@tx_bank_geo_location_check2 							VARCHAR(256)                = NULL
	,	@tx_source_comments 									VARCHAR(256)                = NULL
	,	@tx_applicant_postal_code 								VARCHAR(256)                = NULL
	,	@tx_applicant_address 									VARCHAR(256)                = NULL
	,	@tx_applicant_district 									VARCHAR(256)                = NULL
	,	@tx_applicant_street_name 								VARCHAR(256)                = NULL
	,	@tx_applicant_streetno 									VARCHAR(256)                = NULL
	,	@tx_applicant_post_code 								VARCHAR(256)                = NULL
	,	@tx_applicant_district_of_birth 						VARCHAR(256)                = NULL
	,	@tx_applicant_country_of_birth 							VARCHAR(256)                = NULL
	,	@tx_applicant_idno 										VARCHAR(256)                = NULL
	,	@tx_cib_subject_code 									VARCHAR(256)                = NULL
	,	@tx_fi_subject_code 									VARCHAR(256)                = NULL
	,	@tx_bank_name 											VARCHAR(256)                = NULL
	,	@tx_trade_name 											VARCHAR(256)                = NULL
	,	@tx_fi_code 											VARCHAR(256)                = NULL
	,	@tx_branch_code 										VARCHAR(256)                = NULL
	,	@tx_typeof_financing 									VARCHAR(256)                = NULL
	,	@dec_total_requested_amountor_creditlmt 				DECIMAL(20, 2)              = NULL
	,	@dtt_installment_contract_date 							DATETIME        			= NULL
	,	@dec_installment_amount 								DECIMAL(20, 2)              = NULL
	,	@tx_numof_installment 									VARCHAR(256)                = NULL
	,	@tx_payment_periodicity 								VARCHAR(256)                = NULL
	,	@tx_sector_type 										VARCHAR(256)                = NULL
	,	@tx_sector_code 										VARCHAR(256)                = NULL
	,	@tx_manager_sealan_signaure 							VARCHAR(256)                = NULL
	,	@tx_applicant_signature 								VARCHAR(256)                = NULL
	,	@tx_authorized_officer_seal_and_signaure				VARCHAR(256)                = NULL
	,	@tx_applicant_present_address_street_name 				VARCHAR(256)                = NULL
	,	@tx_applicant_present_address_street_num 				VARCHAR(256)                = NULL
	,	@tx_cif_no 												VARCHAR(256)                = NULL
	,	@tx_fund_source 										VARCHAR(256)                = NULL
	,	@dec_monthly_income 									DECIMAL(20, 2)              = NULL
	,	@tx_spouse_employment_status 							VARCHAR(256)                = NULL
	,	@tx_member_ship_of_club 								VARCHAR(256)                = NULL
	,	@tx_specify_club_name 									VARCHAR(256)                = NULL
	,	@tx_you_are_verified_customer 							VARCHAR(256)                = NULL
	,	@dec_house_rent_range 									DECIMAL(20, 2)              = NULL
	,	@tx_have_customer_own_car 								VARCHAR(256)                = NULL
	,	@tx_car_brand_name 										VARCHAR(256)                = NULL
	,	@dec_travel_yearly_number 								DECIMAL(20, 2)              = NULL
	,	@tx_passport_number_indentity 							VARCHAR(256)                = NULL
	,	@tx_nid_indetity 										VARCHAR(256)                = NULL
	,	@tx_etin_id_identity 									VARCHAR(256)                = NULL
	,	@tx_politically_exposed_person 							VARCHAR(256)                = NULL
	,	@tx_you_are_senior_managment 							VARCHAR(256)                = NULL
	,	@tx_you_are_face_to_face_interview 						VARCHAR(256)                = NULL
	,	@tx_you_are_terrorist_activities 						VARCHAR(256)                = NULL
	,	@tx_you_are_terrorist_activitie_regard 					VARCHAR(256)                = NULL
	,	@tx_exception_details 									VARCHAR(256)                = NULL
	,	@dec_applicant_asking_limit 							DECIMAL(20, 2)  			= NULL
	,	@dec_applicant_recommended_limit 						DECIMAL(20, 2)  			= NULL
	,	@tx_interviewed_source_sign 							VARCHAR(256)                = NULL
	,	@tx_managerOr_unit_head_sign 							VARCHAR(256)                = NULl
	,	@tx_you_are_cbbl_account_holder 						VARCHAR(256)                = NULl
	,	@tx_auto_pay_instruction 								VARCHAR(256)                = NULl
	,	@tx_applicant_usd_account_portion 						VARCHAR(256)                = NULl
	,   @tx_other_bank_liability_position                    	VARCHAR(256)                = NULL
	,   @tx_other_bankacc_details                               VARCHAR(256)                = NULL
	,	@tx_card_state_name 									VARCHAR(256)                = NULL
	,	@int_card_state_id 										INT            				= NULL
	,	@tx_passport_number_obtained							VARCHAR(256)                = NULL
	,	@tx_passport_number_verified							VARCHAR(256)                = NULL
	,	@tx_nid_indetity_obtained								VARCHAR(256)                = NULL
	,	@tx_nid_indetity_verified								VARCHAR(256)                = NULL
	,	@tx_etin_id_identity_obtained							VARCHAR(256)                = NULL
	,	@tx_etin_id_identity_verified							VARCHAR(256)                = NULL
	,	@tx_payment_type_of_standing_instruction				VARCHAR(256)                = NULL
	,	@tx_payment_type_of_standing_instruction1				VARCHAR(256)                = NULL
	,	@tx_applicant_id_type 									VARCHAR(256)                = NULL
	,	@tx_applicant_other_id 									VARCHAR(256)                = NULL
	,	@tx_business_address									VARCHAR(256)                = NULL
	,	@tx_business_district									VARCHAR(256)                = NULL	
	,	@tx_business_street_name								VARCHAR(256)                = NULL	
	,	@tx_business_street_number								VARCHAR(256)                = NULL		
	,	@tx_business_postal_code								VARCHAR(256)                = NULL	
	,	@tx_business_country									VARCHAR(256)                = NULL
	,	@tx_applicant_owner_partner								VARCHAR(256)                = NULL
	,	@tx_applicant_per_street_no								VARCHAR(256)                = NULL
	,	@tx_applicant_per_street_name							VARCHAR(256)                = NULL	


    _SP_PARAM_FOOTER

AS

{
    _SP_HEADER

     IF (((@dtt_mod IS NULL) OR (@dtt_mod = _DB_NULL_DATE)))
	  {
	    SELECT @dtt_mod = GETDATE()
	  }

	IF ( @tx_action_name = 'SELECT_FULL_APPLICANT_DETAILS' )
    {  
    	SELECT AAD.*
        INTO #TMP_ACQUISITION
        FROM T_ACQUISITION_APPLICANT_DETAILS AAD
        WHERE id_credit_card_key = @id_credit_card_key
        AND is_active = 1

        SELECT tx_rs_type = 'RS_TYPE_APPLICANT_DETAILS'
        ,	TA.*
        FROM #TMP_ACQUISITION TA

        SELECT tx_rs_type = 'RS_TYPE_APPLICANT_SUPPLEMENT_REFER_DETAILS'
        ,	ASR.*
        FROM T_SUPPLEMENT_AND_REFER_DETAILS ASR
        JOIN #TMP_ACQUISITION JTA ON JTA.id_supplement_and_refer_key= ASR.id_supplement_and_refer_key

        SELECT ADC.*
        INTO #TEMP_ACQUISITION_CONFIG
        FROM T_ACQUISITION_DETAILS_CONFIG ADC 
        JOIN #TMP_ACQUISITION TTA ON TTA.id_acquisition_applicant_key = ADC.id_acquisition_applicant_key
        WHERE ADC.is_active = 1

        SELECT tx_rs_type = 'RS_TYPE_PREVIOUS_ORGANIZATION_DETAILS'
        ,	*
        FROM #TEMP_ACQUISITION_CONFIG
        WHERE tx_object_type = 'CREDIT_CARD'
        AND tx_group = 'CREDIT_CARD_ACQUISITION_FORM'
        AND tx_sub_group = 'PREVIOUS_ORGANIZATION_DETAILS'

        SELECT tx_rs_type = 'RS_TYPE_OTHER_BANK_DETAILS'
        ,	*
        FROM #TEMP_ACQUISITION_CONFIG
        WHERE tx_object_type = 'CREDIT_CARD'
        AND tx_group = 'CREDIT_CARD_ACQUISITION_FORM'
        AND tx_sub_group = 'OTHER_BANK_DETAILS'

        SELECT tx_rs_type = 'RS_TYPE_BANK_LIABILITY_POSTION'
        ,	*
        FROM #TEMP_ACQUISITION_CONFIG
        WHERE tx_object_type = 'CREDIT_CARD'
        AND tx_group = 'CREDIT_CARD_ACQUISITION_FORM'
        AND tx_sub_group = 'BANK_LIABILITY_POSTION'

        SELECT tx_rs_type = 'RS_TYPE_SECURITY_DETAILS'
        ,	*
        FROM #TEMP_ACQUISITION_CONFIG
        WHERE tx_object_type = 'CREDIT_CARD'
        AND tx_group = 'CREDIT_CARD_ACQUISITION_FORM'
        AND tx_sub_group = 'SECURITY_DETAILS'

        SELECT tx_rs_type = 'RS_TYPE_COMPANIES_UNDER_OWNER_SHIP'
        ,	*
        FROM #TEMP_ACQUISITION_CONFIG
        WHERE tx_object_type = 'CREDIT_CARD'
        AND tx_group = 'CREDIT_CARD_ACQUISITION_FORM'
        AND tx_sub_group = 'COMPANIES_UNDER_OWNER_SHIP'
        
        SELECT  tx_rs_type = 'RS_TYPE_CARD_DOCUMENT' , D.*
        FROM  T_DOCUMENT D
        WHERE id_ref_key = @id_credit_card_key
        AND tx_doc_type != 'CIB_STATUS'
        AND is_active = 1

    }

     IF ( @tx_action_name = _ACTION_NEW)
    {
    	INSERT INTO _TABLE_NAME
        (     
            	_VERSION  

            ,	is_active
			,	id_env_key
			,	id_user_mod_key
			,	dtt_mod
			,	dtt_create
			,	id_event_key
			,	id_creator_key	
            ,	id_supplement_and_refer_key
            ,	id_credit_card_key
            ,	tx_applicant_tid 							
			,	tx_applicant_customer_type 					
			,	tx_applicant_account_number 				
			,	tx_applicant_nid_number 					
			,	tx_applicant_bp_number 						
			,	tx_applicant_applying_for 					
			,	tx_applicant_typeof_card 					
			,	tx_applicant_name 							
			,	tx_applicant_gender_neutral_title 			
			,	tx_applicant_nameon_card 					
			,	tx_applicant_namein_bangla 					
			,	tx_applicant_nationality 					
			,	tx_applicant_specify_nationality 			
			,	tx_applicant_profession 					
			,	dtt_applicant_dateof_birth 					
			,	tx_applicant_etin_number 					
			,	tx_applicant_gender 						
			,	tx_applicant_mobile_number 					
			,	tx_applicant_other_photoid 					
			,	tx_applicant_passportno 					
			,	tx_applicant_id_issue_country 				
			,	dtt_applicant_id_issue_date 					
			,	dtt_applicant_id_issue_date_exp 				
			,	tx_applicant_father_name 					
			,	tx_applicant_mother_name 					
			,	tx_applicant_spouse_name 					
			,	tx_applicant_spouse_mobile_no 				
			,	tx_applicant_marital_status 				
			,	tx_applicant_marital_status_others 			
			,	tx_applicant_noof_dependents 				
			,	tx_applicant_highest_education 				
			,	tx_applicant_highest_education_others 		
			,	tx_applicant_resi_status 					
			,	tx_applicant_resi_address 					
			,	tx_applicant_resi_near_landmark 			
			,	tx_applicant_resi_address_ps 				
			,	tx_applicant_resi_address_post_code 		
			,	tx_applicant_resi_address_district 			
			,	tx_applicant_resi_address_country 			
			,	tx_applicant_per_address 					
			,	tx_applicant_per_address_near_land 			
			,	tx_applicant_per_address_ps 					
			,	tx_applicant_per_address_post_code 			
			,	tx_applicant_per_address_district 			
			,	tx_applicant_per_address_country 			
			,	tx_applicant_occupation 					
			,	tx_applicant_occupation_others 				
			,	tx_applicant_company_name 					
			,	tx_applicant_designation 					
			,	tx_applicant_department 					
			,	tx_applicant_nature_of_business 				
			,	tx_applicant_employee_id 					
			,	tx_applicant_office_address 				
			,	tx_applicant_office_address_ps 				
			,	tx_applicant_office_address_post_code 		
			,	tx_applicant_office_address_district 		
			,	tx_applicant_office_address_country 		
			,	tx_applicant_employee_status 				
			,	tx_applicant_business_established 			
			,	tx_applicant_dur_in_currentjob_year 			
			,	tx_applicant_dur_in_currentjob_month 			
			,	tx_applicant_total_work_expyear 			
			,	tx_applicant_total_work_expmonth 			
			,	tx_applicant_office_phoneno 				
			,	tx_applicant_mobileno 						
			,	tx_applicant_mailing_com_address 			
			,	tx_applicant_card_receiving_way_name 		
			,	tx_applicant_card_receiving_way 			
			,	tx_applicant_monthly_statements_sentWay 	
			,	tx_applicant_prom_activit_purpose_id 		
			,	dec_applicant_additional_income 			
			,	dec_applicant_spouse_income 					
			,	dec_salaried_month_gross_salary 			
			,	dec_salaried_month_total_deduction 			
			,	dec_salaried_month_net_income 				
			,	dec_nonsalaried_month_gross_salary 			
			,	dec_non_salaried_month_total_expense 		
			,	dec_non_salaried_month_net_income 			
			,	dec_demand_promissory_taka 					
			,	dtt_demand_promissory_date 					
			,	tx_demand_promissory_place 					
			,	tx_demand_promissory_message 				
			,	dec_demand_promissory_second_taka 			
			,	int_demand_promissory_rate					
			,	tx_bank_branch_name 							
			,	int_bank_solid 								
			,	tx_bank_geo_location_check1 				
			,	tx_bank_geo_location_text1 					
			,	tx_bank_geo_location_text2 					
			,	tx_bank_geo_location_check2 				
			,	tx_source_comments 							
			,	tx_applicant_postal_code 					
			,	tx_applicant_address 						
			,	tx_applicant_district 						
			,	tx_applicant_street_name 					
			,	tx_applicant_streetno 						
			,	tx_applicant_post_code 						
			,	tx_applicant_district_of_birth 				
			,	tx_applicant_country_of_birth 				
			,	tx_applicant_idno 							
			,	tx_cib_subject_code 						
			,	tx_fi_subject_code 							
			,	tx_bank_name 								
			,	tx_trade_name 								
			,	tx_fi_code 									
			,	tx_branch_code 								
			,	tx_typeof_financing 						
			,	dec_total_requested_amountor_creditlmt 		
			,	dtt_installment_contract_date 				
			,	dec_installment_amount 						
			,	tx_numof_installment 						
			,	tx_payment_periodicity 						
			,	tx_sector_type 								
			,	tx_sector_code 								
			,	tx_manager_sealan_signaure 					
			,	tx_applicant_signature 						
			,	tx_authorized_officer_seal_and_signaure		
			,	tx_applicant_present_address_street_name 		
			,	tx_applicant_present_address_street_num 		
			,	tx_cif_no 									
			,	tx_fund_source 								
			,	dec_monthly_income 							
			,	tx_spouse_employment_status 				
			,	tx_member_ship_of_club 						
			,	tx_specify_club_name 						
			,	tx_you_are_verified_customer 				
			,	dec_house_rent_range 						
			,	tx_have_customer_own_car 					
			,	tx_car_brand_name 							
			,	dec_travel_yearly_number 					
			,	tx_passport_number_indentity 				
			,	tx_nid_indetity 							
			,	tx_etin_id_identity 						
			,	tx_politically_exposed_person 				
			,	tx_you_are_senior_managment 				
			,	tx_you_are_face_to_face_interview 			
			,	tx_you_are_terrorist_activities 			
			,	tx_you_are_terrorist_activitie_regard 		
			,	tx_exception_details 						
			,	dec_applicant_asking_limit 					
			,	dec_applicant_recommended_limit 			
			,	tx_interviewed_source_sign 					
			,	tx_managerOr_unit_head_sign
			,	tx_you_are_cbbl_account_holder 	
			,	tx_auto_pay_instruction 		
			,	tx_applicant_usd_account_portion
			,	tx_other_bank_liability_position
			,	tx_other_bankacc_details
			,	tx_card_state_name
			,	int_card_state_id
			,	tx_passport_number_obtained
			,	tx_passport_number_verified
			,	tx_nid_indetity_obtained
			,	tx_nid_indetity_verified
			,	tx_etin_id_identity_obtained
			,	tx_etin_id_identity_verified
			,	tx_payment_type_of_standing_instruction
			,	tx_payment_type_of_standing_instruction1
			,	tx_applicant_id_type
			,	tx_applicant_other_id
			,	tx_business_address
			,	tx_business_district
			,	tx_business_street_name
			,	tx_business_street_number
			,	tx_business_postal_code
			,	tx_business_country
			,	tx_applicant_owner_partner
			,	tx_applicant_per_street_no
			,	tx_applicant_per_street_name
		)
		 VALUES
        (
            0	
			,	ISNULL(@is_active								,1)	
			,	ISNULL(@id_env_key								,100000)	
			,	ISNULL(@id_user_mod_key							,_DB_NULL_INT)	
			,	ISNULL(@dtt_mod									,GETDATE())	
			,	ISNULL(@dtt_create								,GETDATE())		
			,	ISNULL(@id_event_key							,0)	
			,	ISNULL(@id_creator_key							,_DB_NULL_INT)
            ,	ISNULL(@id_supplement_and_refer_key				,_DB_NULL_INT)
            ,	ISNULL(@id_credit_card_key						,_DB_NULL_INT)
            ,	ISNULL(@tx_applicant_tid 						,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_customer_type 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_account_number 			,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_nid_number 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_bp_number 					,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_applying_for 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_typeof_card 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_name 						,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_gender_neutral_title 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_nameon_card 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_namein_bangla 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_nationality 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_specify_nationality 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_profession 				,_DB_NULL_STR)
			,	ISNULL(@dtt_applicant_dateof_birth 				,_DB_NULL_DATE)
			,	ISNULL(@tx_applicant_etin_number 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_gender 					,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_mobile_number 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_other_photoid 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_passportno 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_id_issue_country 			,_DB_NULL_STR)
			,	ISNULL(@dtt_applicant_id_issue_date 				,_DB_NULL_DATE)
			,	ISNULL(@dtt_applicant_id_issue_date_exp 			,_DB_NULL_DATE)
			,	ISNULL(@tx_applicant_father_name 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_mother_name 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_spouse_name 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_spouse_mobile_no 			,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_marital_status 			,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_marital_status_others 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_noof_dependents 			,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_highest_education 			,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_highest_education_others 	,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_resi_status 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_resi_address 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_resi_near_landmark 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_resi_address_ps 			,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_resi_address_post_code 	,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_resi_address_district 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_resi_address_country 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_per_address 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_per_address_near_land 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_per_address_ps 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_per_address_post_code 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_per_address_district 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_per_address_country 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_occupation 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_occupation_others 			,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_company_name 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_designation 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_department 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_nature_of_business 			,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_employee_id 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_office_address 			,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_office_address_ps 			,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_office_address_post_code 	,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_office_address_district 	,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_office_address_country 	,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_employee_status 			,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_business_established 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_dur_in_currentjob_year 	,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_dur_in_currentjob_month 	,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_total_work_expyear 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_total_work_expmonth 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_office_phoneno 			,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_mobileno 					,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_mailing_com_address 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_card_receiving_way_name 	,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_card_receiving_way 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_monthly_statements_sentWay,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_prom_activit_purpose_id 	,_DB_NULL_STR)
			,	ISNULL(@dec_applicant_additional_income 		,_DB_NULL_FLOAT)
			,	ISNULL(@dec_applicant_spouse_income 			,_DB_NULL_FLOAT)
			,	ISNULL(@dec_salaried_month_gross_salary 		,_DB_NULL_FLOAT)
			,	ISNULL(@dec_salaried_month_total_deduction 		,_DB_NULL_FLOAT)
			,	ISNULL(@dec_salaried_month_net_income 			,_DB_NULL_FLOAT)
			,	ISNULL(@dec_nonsalaried_month_gross_salary 		,_DB_NULL_FLOAT)
			,	ISNULL(@dec_non_salaried_month_total_expense 	,_DB_NULL_FLOAT)
			,	ISNULL(@dec_non_salaried_month_net_income 		,_DB_NULL_FLOAT)
			,	ISNULL(@dec_demand_promissory_taka 				,_DB_NULL_FLOAT)
			,	ISNULL(@dtt_demand_promissory_date 				,_DB_NULL_DATE)
			,	ISNULL(@tx_demand_promissory_place 				,_DB_NULL_STR)
			,	ISNULL(@tx_demand_promissory_message 			,_DB_NULL_STR)
			,	ISNULL(@dec_demand_promissory_second_taka 		,_DB_NULL_FLOAT)
			,	ISNULL(@int_demand_promissory_rate				,_DB_NULL_INT)
			,	ISNULL(@tx_bank_branch_name 						,_DB_NULL_STR)
			,	ISNULL(@int_bank_solid 							,_DB_NULL_INT)
			,	ISNULL(@tx_bank_geo_location_check1 			,_DB_NULL_STR)
			,	ISNULL(@tx_bank_geo_location_text1 				,_DB_NULL_STR)
			,	ISNULL(@tx_bank_geo_location_text2 				,_DB_NULL_STR)
			,	ISNULL(@tx_bank_geo_location_check2 			,_DB_NULL_STR)
			,	ISNULL(@tx_source_comments 						,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_postal_code 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_address 					,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_district 					,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_street_name 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_streetno 					,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_post_code 					,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_district_of_birth 			,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_country_of_birth 			,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_idno 						,_DB_NULL_STR)
			,	ISNULL(@tx_cib_subject_code 					,_DB_NULL_STR)
			,	ISNULL(@tx_fi_subject_code 						,_DB_NULL_STR)
			,	ISNULL(@tx_bank_name 							,_DB_NULL_STR)
			,	ISNULL(@tx_trade_name 							,_DB_NULL_STR)
			,	ISNULL(@tx_fi_code 								,_DB_NULL_STR)
			,	ISNULL(@tx_branch_code 							,_DB_NULL_STR)
			,	ISNULL(@tx_typeof_financing 					,_DB_NULL_STR)
			,	ISNULL(@dec_total_requested_amountor_creditlmt 	,_DB_NULL_FLOAT)
			,	ISNULL(@dtt_installment_contract_date 			,_DB_NULL_DATE)
			,	ISNULL(@dec_installment_amount 					,_DB_NULL_FLOAT)
			,	ISNULL(@tx_numof_installment 					,_DB_NULL_STR)
			,	ISNULL(@tx_payment_periodicity 					,_DB_NULL_STR)
			,	ISNULL(@tx_sector_type 							,_DB_NULL_STR)
			,	ISNULL(@tx_sector_code 							,_DB_NULL_STR)
			,	ISNULL(@tx_manager_sealan_signaure 				,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_signature 					,_DB_NULL_STR)
			,	ISNULL(@tx_authorized_officer_seal_and_signaure,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_present_address_street_name ,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_present_address_street_num ,_DB_NULL_STR)
			,	ISNULL(@tx_cif_no 								,_DB_NULL_STR)
			,	ISNULL(@tx_fund_source 							,_DB_NULL_STR)
			,	ISNULL(@dec_monthly_income 						,_DB_NULL_FLOAT)
			,	ISNULL(@tx_spouse_employment_status 			,_DB_NULL_STR)
			,	ISNULL(@tx_member_ship_of_club 					,_DB_NULL_STR)
			,	ISNULL(@tx_specify_club_name 					,_DB_NULL_STR)
			,	ISNULL(@tx_you_are_verified_customer 			,_DB_NULL_STR)
			,	ISNULL(@dec_house_rent_range 					,_DB_NULL_FLOAT)
			,	ISNULL(@tx_have_customer_own_car 				,_DB_NULL_STR)
			,	ISNULL(@tx_car_brand_name 						,_DB_NULL_STR)
			,	ISNULL(@dec_travel_yearly_number 				,_DB_NULL_FLOAT)
			,	ISNULL(@tx_passport_number_indentity 			,_DB_NULL_STR)
			,	ISNULL(@tx_nid_indetity 						,_DB_NULL_STR)
			,	ISNULL(@tx_etin_id_identity 					,_DB_NULL_STR)
			,	ISNULL(@tx_politically_exposed_person 			,_DB_NULL_STR)
			,	ISNULL(@tx_you_are_senior_managment 			,_DB_NULL_STR)
			,	ISNULL(@tx_you_are_face_to_face_interview 		,_DB_NULL_STR)
			,	ISNULL(@tx_you_are_terrorist_activities 		,_DB_NULL_STR)
			,	ISNULL(@tx_you_are_terrorist_activitie_regard 	,_DB_NULL_STR)
			,	ISNULL(@tx_exception_details 					,_DB_NULL_STR)
			,	ISNULL(@dec_applicant_asking_limit 				,_DB_NULL_FLOAT)
			,	ISNULL(@dec_applicant_recommended_limit 		,_DB_NULL_FLOAT)
			,	ISNULL(@tx_interviewed_source_sign 				,_DB_NULL_STR)
			,	ISNULL(@tx_managerOr_unit_head_sign 			,_DB_NULL_STR)
			,	ISNULL(@tx_you_are_cbbl_account_holder 			,_DB_NULL_STR)
			,	ISNULL(@tx_auto_pay_instruction 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_usd_account_portion 		,_DB_NULL_STR)	
			,	ISNULL(@tx_other_bank_liability_position		,_DB_NULL_STR)
			,	ISNULL(@tx_other_bankacc_details				,_DB_NULL_STR)
			,	ISNULL(@tx_card_state_name						,_DB_NULL_STR)
			,	ISNULL(@int_card_state_id						,_DB_NULL_INT)	
			,	ISNULL(@tx_passport_number_obtained 			,_DB_NULL_STR)
			,	ISNULL(@tx_passport_number_verified				,_DB_NULL_STR)
			,	ISNULL(@tx_nid_indetity_obtained 				,_DB_NULL_STR)
			,	ISNULL(@tx_nid_indetity_verified 				,_DB_NULL_STR)
			,	ISNULL(@tx_etin_id_identity_obtained 			,_DB_NULL_STR)
			,	ISNULL(@tx_etin_id_identity_verified 			,_DB_NULL_STR)
			,	ISNULL(@tx_payment_type_of_standing_instruction 	,_DB_NULL_STR)
			,	ISNULL(@tx_payment_type_of_standing_instruction1 	,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_id_type				 	,_DB_NULL_STR)		
			,	ISNULL(@tx_applicant_other_id				 	,_DB_NULL_STR)	
			,	ISNULL(@tx_business_address 		,_DB_NULL_STR)
			,	ISNULL(@tx_business_district 			,_DB_NULL_STR)
			,	ISNULL(@tx_business_street_name 					,_DB_NULL_STR)
			,	ISNULL(@tx_business_street_number 		,_DB_NULL_STR)
			,	ISNULL(@tx_business_postal_code 	,_DB_NULL_STR)
			,	ISNULL(@tx_business_country 		,_DB_NULL_STR)
			,	ISNULL(@tx_applicant_owner_partner,_DB_NULL_STR)	
			,	ISNULL(@tx_applicant_per_street_no , _DB_NULL_STR)
			,	ISNULL(@tx_applicant_per_street_name , _DB_NULL_STR)
        ) 	
        SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_ACQUISITION_APPLICANT_DETAILS')			
    }
    IF( @tx_action_name = _ACTION_UPDATE )
    {
    	if(@id_acquisition_applicant_ver IS NULL)
        {
            SELECT @id_acquisition_applicant_ver = (SELECT id_acquisition_applicant_ver FROM T_ACQUISITION_APPLICANT_DETAILS WHERE id_acquisition_applicant_key = @id_acquisition_applicant_key)
        }
    	UPDATE _TABLE_NAME
        SET

     	id_acquisition_applicant_ver                    = 	@id_acquisition_applicant_ver + 1 
    
    ,	is_active										=	ISNULL(@is_active									,is_active)	
	,	id_env_key										=	ISNULL(@id_env_key									,id_env_key)	
	,	id_user_mod_key									=	ISNULL(@id_user_mod_key								,id_user_mod_key)	
	,	dtt_mod											=	ISNULL(@dtt_mod										,dtt_mod)	
	,	dtt_create										=	ISNULL(@dtt_create									,dtt_create)	
	,	id_event_key									=	ISNULL(@id_event_key								,id_event_key)	
	,	id_creator_key									=	ISNULL(@id_creator_key								,id_creator_key)   

    ,	id_supplement_and_refer_key					 =	ISNULL(@id_supplement_and_refer_key						,	id_supplement_and_refer_key)																		
	,	id_credit_card_key							 =	ISNULL(@id_credit_card_key								,	id_credit_card_key)														
	,	tx_applicant_tid							 =	ISNULL(@tx_applicant_tid								,	tx_applicant_tid)														
	,	tx_applicant_customer_type					 =	ISNULL(@tx_applicant_customer_type						,	tx_applicant_customer_type)																		
	,	tx_applicant_account_number					 =	ISNULL(@tx_applicant_account_number						,	tx_applicant_account_number)																		
	,	tx_applicant_nid_number						 =	ISNULL(@tx_applicant_nid_number							,	tx_applicant_nid_number)																
	,	tx_applicant_bp_number						 =	ISNULL(@tx_applicant_bp_number							,	tx_applicant_bp_number)																
	,	tx_applicant_applying_for					 =	ISNULL(@tx_applicant_applying_for						,	tx_applicant_applying_for)																		
	,	tx_applicant_typeof_card					 =	ISNULL(@tx_applicant_typeof_card						,	tx_applicant_typeof_card)																		
	,	tx_applicant_name							 =	ISNULL(@tx_applicant_name								, 	tx_applicant_name)													
	,	tx_applicant_gender_neutral_title			 =	ISNULL(@tx_applicant_gender_neutral_title				, 	tx_applicant_gender_neutral_title)																					
	,	tx_applicant_nameon_card					 =	ISNULL(@tx_applicant_nameon_card						, 	tx_applicant_nameon_card)																	
	,	tx_applicant_namein_bangla					 =	ISNULL(@tx_applicant_namein_bangla						, 	tx_applicant_namein_bangla)																	
	,	tx_applicant_nationality					 =	ISNULL(@tx_applicant_nationality						, 	tx_applicant_nationality)																	
	,	tx_applicant_specify_nationality			 =	ISNULL(@tx_applicant_specify_nationality				, 	tx_applicant_specify_nationality)																					
	,	tx_applicant_profession						 =	ISNULL(@tx_applicant_profession							, 	tx_applicant_profession)															
	,	dtt_applicant_dateof_birth					 =	ISNULL(@dtt_applicant_dateof_birth						, 	dtt_applicant_dateof_birth)																	
	,	tx_applicant_etin_number					 =	ISNULL(@tx_applicant_etin_number						, 	tx_applicant_etin_number)																	
	,	tx_applicant_gender							 =	ISNULL(@tx_applicant_gender								, 	tx_applicant_gender)													
	,	tx_applicant_mobile_number					 =	ISNULL(@tx_applicant_mobile_number						, 	tx_applicant_mobile_number)																	
	,	tx_applicant_other_photoid					 =	ISNULL(@tx_applicant_other_photoid						, 	tx_applicant_other_photoid)																	
	,	tx_applicant_passportno						 =	ISNULL(@tx_applicant_passportno							, 	tx_applicant_passportno)															
	,	tx_applicant_id_issue_country				 =	ISNULL(@tx_applicant_id_issue_country					, 	tx_applicant_id_issue_country)																			
	,	dtt_applicant_id_issue_date					 =	ISNULL(@dtt_applicant_id_issue_date						, 	dtt_applicant_id_issue_date)																	
	,	dtt_applicant_id_issue_date_exp				 =	ISNULL(@dtt_applicant_id_issue_date_exp					, 	dtt_applicant_id_issue_date_exp)																			
	,	tx_applicant_father_name					 =	ISNULL(@tx_applicant_father_name						, 	tx_applicant_father_name)															
	,	tx_applicant_mother_name					 =	ISNULL(@tx_applicant_mother_name						, 	tx_applicant_mother_name)															
	,	tx_applicant_spouse_name					 =	ISNULL(@tx_applicant_spouse_name						, 	tx_applicant_spouse_name)															
	,	tx_applicant_spouse_mobile_no				 =	ISNULL(@tx_applicant_spouse_mobile_no					, 	tx_applicant_spouse_mobile_no)																			
	,	tx_applicant_marital_status					 =	ISNULL(@tx_applicant_marital_status						, 	tx_applicant_marital_status)																	
	,	tx_applicant_marital_status_others			 =	ISNULL(@tx_applicant_marital_status_others				, 	tx_applicant_marital_status_others)																					
	,	tx_applicant_noof_dependents				 =	ISNULL(@tx_applicant_noof_dependents					, 	tx_applicant_noof_dependents)																			
	,	tx_applicant_highest_education				 =	ISNULL(@tx_applicant_highest_education					, 	tx_applicant_highest_education)																			
	,	tx_applicant_highest_education_others		 =	ISNULL(@tx_applicant_highest_education_others			, 	tx_applicant_highest_education_others)																							
	,	tx_applicant_resi_status					 =	ISNULL(@tx_applicant_resi_status						, 	tx_applicant_resi_status)																	
	,	tx_applicant_resi_address					 =	ISNULL(@tx_applicant_resi_address						, 	tx_applicant_resi_address)																	
	,	tx_applicant_resi_near_landmark				 =	ISNULL(@tx_applicant_resi_near_landmark					, 	tx_applicant_resi_near_landmark)																			
	,	tx_applicant_resi_address_ps				 =	ISNULL(@tx_applicant_resi_address_ps						, 	tx_applicant_resi_address_ps)																	
	,	tx_applicant_resi_address_post_code			 =	ISNULL(@tx_applicant_resi_address_post_code				, 	tx_applicant_resi_address_post_code)																					
	,	tx_applicant_resi_address_district			 =	ISNULL(@tx_applicant_resi_address_district				, 	tx_applicant_resi_address_district)																					
	,	tx_applicant_resi_address_country			 =	ISNULL(@tx_applicant_resi_address_country				, 	tx_applicant_resi_address_country)																					
	,	tx_applicant_per_address					 =	ISNULL(@tx_applicant_per_address						, 	tx_applicant_per_address)																	
	,	tx_applicant_per_address_near_land			 =	ISNULL(@tx_applicant_per_address_near_land				, 	tx_applicant_per_address_near_land)																					
	,	tx_applicant_per_address_ps					 =	ISNULL(@tx_applicant_per_address_ps						, 	tx_applicant_per_address_ps)																	
	,	tx_applicant_per_address_post_code			 =	ISNULL(@tx_applicant_per_address_post_code				, 	tx_applicant_per_address_post_code)																					
	,	tx_applicant_per_address_district			 =	ISNULL(@tx_applicant_per_address_district				, 	tx_applicant_per_address_district)																					
	,	tx_applicant_per_address_country			 =	ISNULL(@tx_applicant_per_address_country				, 	tx_applicant_per_address_country)																					
	,	tx_applicant_occupation						 =	ISNULL(@tx_applicant_occupation							, 	tx_applicant_occupation)															
	,	tx_applicant_occupation_others				 =	ISNULL(@tx_applicant_occupation_others					, 	tx_applicant_occupation_others)																			
	,	tx_applicant_company_name					 =	ISNULL(@tx_applicant_company_name						, 	tx_applicant_company_name)																	
	,	tx_applicant_designation					 =	ISNULL(@tx_applicant_designation						, 	tx_applicant_designation)																	
	,	tx_applicant_department						 =	ISNULL(@tx_applicant_department							, 	tx_applicant_department)															
	,	tx_applicant_nature_of_business				 =	ISNULL(@tx_applicant_nature_of_business					, 	tx_applicant_nature_of_business)																			
	,	tx_applicant_employee_id					 =	ISNULL(@tx_applicant_employee_id						, 	tx_applicant_employee_id)															
	,	tx_applicant_office_address					 =	ISNULL(@tx_applicant_office_address						, 	tx_applicant_office_address)																	
	,	tx_applicant_office_address_ps				 =	ISNULL(@tx_applicant_office_address_ps					, 	tx_applicant_office_address_ps)																			
	,	tx_applicant_office_address_post_code		 =	ISNULL(@tx_applicant_office_address_post_code			, 	tx_applicant_office_address_post_code)																							
	,	tx_applicant_office_address_district		 =	ISNULL(@tx_applicant_office_address_district			, 	tx_applicant_office_address_district)																							
	,	tx_applicant_office_address_country			 =	ISNULL(@tx_applicant_office_address_country				, 	tx_applicant_office_address_country)																					
	,	tx_applicant_employee_status				 =	ISNULL(@tx_applicant_employee_status					, 	tx_applicant_employee_status)																			
	,	tx_applicant_business_established			 =	ISNULL(@tx_applicant_business_established				, 	tx_applicant_business_established)																					
	,	tx_applicant_dur_in_currentjob_year			 =	ISNULL(@tx_applicant_dur_in_currentjob_year				, 	tx_applicant_dur_in_currentjob_year)																					
	,	tx_applicant_dur_in_currentjob_month		 =	ISNULL(@tx_applicant_dur_in_currentjob_month				, 	tx_applicant_dur_in_currentjob_month)																					
	,	tx_applicant_total_work_expyear				 =	ISNULL(@tx_applicant_total_work_expyear					, 	tx_applicant_total_work_expyear)																			
	,	tx_applicant_total_work_expmonth			 =	ISNULL(@tx_applicant_total_work_expmonth				, 	tx_applicant_total_work_expmonth)																					
	,	tx_applicant_office_phoneno					 =	ISNULL(@tx_applicant_office_phoneno						, 	tx_applicant_office_phoneno)																	
	,	tx_applicant_mobileno						 =	ISNULL(@tx_applicant_mobileno							, 	tx_applicant_mobileno)															
	,	tx_applicant_mailing_com_address			 =	ISNULL(@tx_applicant_mailing_com_address				, 	tx_applicant_mailing_com_address)																					
	,	tx_applicant_card_receiving_way_name		 =	ISNULL(@tx_applicant_card_receiving_way_name			, 	tx_applicant_card_receiving_way_name)																					
	,	tx_applicant_card_receiving_way				 =	ISNULL(@tx_applicant_card_receiving_way					, 	tx_applicant_card_receiving_way)																			
	,	tx_applicant_monthly_statements_sentWay		 =	ISNULL(@tx_applicant_monthly_statements_sentWay			, 	tx_applicant_monthly_statements_sentWay)																							
	,	tx_applicant_prom_activit_purpose_id		 =	ISNULL(@tx_applicant_prom_activit_purpose_id			, 	tx_applicant_prom_activit_purpose_id)																					
	,	dec_applicant_additional_income				 =	ISNULL(@dec_applicant_additional_income					, 	dec_applicant_additional_income)																			
	,	dec_applicant_spouse_income					 =	ISNULL(@dec_applicant_spouse_income						, 	dec_applicant_spouse_income)																	
	,	dec_salaried_month_gross_salary				 =	ISNULL(@dec_salaried_month_gross_salary					, 	dec_salaried_month_gross_salary)																			
	,	dec_salaried_month_total_deduction			 =	ISNULL(@dec_salaried_month_total_deduction				, 	dec_salaried_month_total_deduction)																					
	,	dec_salaried_month_net_income				 =	ISNULL(@dec_salaried_month_net_income					, 	dec_salaried_month_net_income)																			
	,	dec_nonsalaried_month_gross_salary			 =	ISNULL(@dec_nonsalaried_month_gross_salary				, 	dec_nonsalaried_month_gross_salary)																					
	,	dec_non_salaried_month_total_expense		 =	ISNULL(@dec_non_salaried_month_total_expense			, 	dec_non_salaried_month_total_expense)																							
	,	dec_non_salaried_month_net_income			 =	ISNULL(@dec_non_salaried_month_net_income				, 	dec_non_salaried_month_net_income)																					
	,	dec_demand_promissory_taka					 =	ISNULL(@dec_demand_promissory_taka						, 	dec_demand_promissory_taka)																	
	,	dtt_demand_promissory_date					 =	ISNULL(@dtt_demand_promissory_date						, 	dtt_demand_promissory_date)																	
	,	tx_demand_promissory_place					 =	ISNULL(@tx_demand_promissory_place						, 	tx_demand_promissory_place)																	
	,	tx_demand_promissory_message				 =	ISNULL(@tx_demand_promissory_message					, 	tx_demand_promissory_message)																			
	,	dec_demand_promissory_second_taka			 =	ISNULL(@dec_demand_promissory_second_taka				, 	dec_demand_promissory_second_taka)																					
	,	int_demand_promissory_rate					 =	ISNULL(@int_demand_promissory_rate						, 	int_demand_promissory_rate)																	
	,	tx_bank_branch_name							 =	ISNULL(@tx_bank_branch_name								, 	tx_bank_branch_name)													
	,	int_bank_solid								 =	ISNULL(@int_bank_solid									, 	int_bank_solid)											
	,	tx_bank_geo_location_check1					 =	ISNULL(@tx_bank_geo_location_check1						, 	tx_bank_geo_location_check1)																	
	,	tx_bank_geo_location_text1					 =	ISNULL(@tx_bank_geo_location_text1						, 	tx_bank_geo_location_text1)																	
	,	tx_bank_geo_location_text2					 =	ISNULL(@tx_bank_geo_location_text2						, 	tx_bank_geo_location_text2)																	
	,	tx_bank_geo_location_check2					 =	ISNULL(@tx_bank_geo_location_check2						, 	tx_bank_geo_location_check2)																	
	,	tx_source_comments							 =	ISNULL(@tx_source_comments								, 	tx_source_comments)													
	,	tx_applicant_postal_code					 =	ISNULL(@tx_applicant_postal_code						, 	tx_applicant_postal_code)																	
	,	tx_applicant_address						 =	ISNULL(@tx_applicant_address							, 	tx_applicant_address)															
	,	tx_applicant_district						 =	ISNULL(@tx_applicant_district							, 	tx_applicant_district)															
	,	tx_applicant_street_name					 =	ISNULL(@tx_applicant_street_name						, 	tx_applicant_street_name)																	
	,	tx_applicant_streetno						 =	ISNULL(@tx_applicant_streetno							, 	tx_applicant_streetno)															
	,	tx_applicant_post_code						 =	ISNULL(@tx_applicant_post_code							, 	tx_applicant_post_code)															
	,	tx_applicant_district_of_birth				 =	ISNULL(@tx_applicant_district_of_birth					, 	tx_applicant_district_of_birth)																			
	,	tx_applicant_country_of_birth				 =	ISNULL(@tx_applicant_country_of_birth					, 	tx_applicant_country_of_birth)																			
	,	tx_applicant_idno							 =	ISNULL(@tx_applicant_idno								, 	tx_applicant_idno)													
	,	tx_cib_subject_code							 =	ISNULL(@tx_cib_subject_code								, 	tx_cib_subject_code)													
	,	tx_fi_subject_code							 =	ISNULL(@tx_fi_subject_code								, 	tx_fi_subject_code)													
	,	tx_bank_name								 =	ISNULL(@tx_bank_name									, 	tx_bank_name)											
	,	tx_trade_name								 =	ISNULL(@tx_trade_name									, 	tx_trade_name)											
	,	tx_fi_code									 =	ISNULL(@tx_fi_code										, 	tx_fi_code)									
	,	tx_branch_code								 =	ISNULL(@tx_branch_code									, 	tx_branch_code)											
	,	tx_typeof_financing							 =	ISNULL(@tx_typeof_financing								, 	tx_typeof_financing)													
	,	dec_total_requested_amountor_creditlmt		 =	ISNULL(@dec_total_requested_amountor_creditlmt			, 	dec_total_requested_amountor_creditlmt)																							
	,	dtt_installment_contract_date				 =	ISNULL(@dtt_installment_contract_date					, 	dtt_installment_contract_date)																			
	,	dec_installment_amount						 =	ISNULL(@dec_installment_amount							, 	dec_installment_amount)															
	,	tx_numof_installment						 =	ISNULL(@tx_numof_installment							, 	tx_numof_installment)															
	,	tx_payment_periodicity						 =	ISNULL(@tx_payment_periodicity							, 	tx_payment_periodicity)															
	,	tx_sector_type								 =	ISNULL(@tx_sector_type									, 	tx_sector_type)											
	,	tx_sector_code								 =	ISNULL(@tx_sector_code									, 	tx_sector_code)											
	,	tx_manager_sealan_signaure					 =	ISNULL(@tx_manager_sealan_signaure						, 	tx_manager_sealan_signaure)																	
	,	tx_applicant_signature						 =	ISNULL(@tx_applicant_signature							, 	tx_applicant_signature)															
	,	tx_authorized_officer_seal_and_signaure		 =	ISNULL(@tx_authorized_officer_seal_and_signaure			, 	tx_authorized_officer_seal_and_signaure)																							
	,	tx_applicant_present_address_street_name	 =	ISNULL(@tx_applicant_present_address_street_name		, 	tx_applicant_present_address_street_name)																							
	,	tx_applicant_present_address_street_num		 =	ISNULL(@tx_applicant_present_address_street_num			, 	tx_applicant_present_address_street_num)																							
	,	tx_cif_no									 =	ISNULL(@tx_cif_no										, 	tx_cif_no)									
	,	tx_fund_source								 =	ISNULL(@tx_fund_source									, 	tx_fund_source)											
	,	dec_monthly_income							 =	ISNULL(@dec_monthly_income								, 	dec_monthly_income)													
	,	tx_spouse_employment_status					 =	ISNULL(@tx_spouse_employment_status						, 	tx_spouse_employment_status)																	
	,	tx_member_ship_of_club						 =	ISNULL(@tx_member_ship_of_club							, 	tx_member_ship_of_club)															
	,	tx_specify_club_name						 =	ISNULL(@tx_specify_club_name							, 	tx_specify_club_name)															
	,	tx_you_are_verified_customer				 =	ISNULL(@tx_you_are_verified_customer					, 	tx_you_are_verified_customer)																			
	,	dec_house_rent_range						 =	ISNULL(@dec_house_rent_range								, 	dec_house_rent_range)													
	,	tx_have_customer_own_car					 =	ISNULL(@tx_have_customer_own_car						, 	tx_have_customer_own_car)																	
	,	tx_car_brand_name							 =	ISNULL(@tx_car_brand_name								, 	tx_car_brand_name)													
	,	dec_travel_yearly_number					 =	ISNULL(@dec_travel_yearly_number							, 	dec_travel_yearly_number)															
	,	tx_passport_number_indentity				 =	ISNULL(@tx_passport_number_indentity					, 	tx_passport_number_indentity)																			
	,	tx_nid_indetity								 =	ISNULL(@tx_nid_indetity									, 	tx_nid_indetity)											
	,	tx_etin_id_identity							 =	ISNULL(@tx_etin_id_identity								, 	tx_etin_id_identity)													
	,	tx_politically_exposed_person				 =	ISNULL(@tx_politically_exposed_person					, 	tx_politically_exposed_person)																			
	,	tx_you_are_senior_managment					 =	ISNULL(@tx_you_are_senior_managment						, 	tx_you_are_senior_managment)																	
	,	tx_you_are_face_to_face_interview			 =	ISNULL(@tx_you_are_face_to_face_interview				, 	tx_you_are_face_to_face_interview)																					
	,	tx_you_are_terrorist_activities				 =	ISNULL(@tx_you_are_terrorist_activities					, 	tx_you_are_terrorist_activities)																			
	,	tx_you_are_terrorist_activitie_regard		 =	ISNULL(@tx_you_are_terrorist_activitie_regard			, 	tx_you_are_terrorist_activitie_regard)																							
	,	tx_exception_details						 =	ISNULL(@tx_exception_details							, 	tx_exception_details)															
	,	dec_applicant_asking_limit					 =	ISNULL(@dec_applicant_asking_limit						, 	dec_applicant_asking_limit)																	
	,	dec_applicant_recommended_limit				 =	ISNULL(@dec_applicant_recommended_limit					, 	dec_applicant_recommended_limit)																			
	,	tx_interviewed_source_sign					 =	ISNULL(@tx_interviewed_source_sign						, 	tx_interviewed_source_sign)																	
	,	tx_managerOr_unit_head_sign					 =	ISNULL(@tx_managerOr_unit_head_sign						, 	tx_managerOr_unit_head_sign)																	
	,	tx_you_are_cbbl_account_holder				 =	ISNULL(@tx_you_are_cbbl_account_holder					, 	tx_you_are_cbbl_account_holder)																			
	,	tx_auto_pay_instruction						 =	ISNULL(@tx_auto_pay_instruction							, 	tx_auto_pay_instruction)															
	,	tx_applicant_usd_account_portion			 =	ISNULL(@tx_applicant_usd_account_portion				, 	tx_applicant_usd_account_portion)																					
	,	tx_other_bank_liability_position			 =	ISNULL(@tx_other_bank_liability_position				, 	tx_other_bank_liability_position)																					
	,	tx_other_bankacc_details					 =	ISNULL(@tx_other_bankacc_details						, 	tx_other_bankacc_details)																	
	,	tx_card_state_name							 =	ISNULL(@tx_card_state_name								, 	tx_card_state_name)													
	,	int_card_state_id							 = 	ISNULL(@int_card_state_id								, 	int_card_state_id)		
	,	tx_passport_number_obtained					 =	ISNULL(@tx_passport_number_obtained						, 	tx_passport_number_obtained)
	,   tx_passport_number_verified					 =	ISNULL(@tx_passport_number_verified						, 	tx_passport_number_verified)
	,	tx_nid_indetity_obtained					 =	ISNULL(@tx_nid_indetity_obtained						, 	tx_nid_indetity_obtained)
	,	tx_nid_indetity_verified					 =	ISNULL(@tx_nid_indetity_verified						, 	tx_nid_indetity_verified)
	,	tx_etin_id_identity_obtained				 =	ISNULL(@tx_etin_id_identity_obtained					, 	tx_etin_id_identity_obtained)
	,	tx_etin_id_identity_verified				 =	ISNULL(@tx_etin_id_identity_verified					, 	tx_etin_id_identity_verified)
	,	tx_payment_type_of_standing_instruction		 =	ISNULL(@tx_payment_type_of_standing_instruction		    , 	tx_payment_type_of_standing_instruction)
	,	tx_payment_type_of_standing_instruction1	 =	ISNULL(@tx_payment_type_of_standing_instruction1		, 	tx_payment_type_of_standing_instruction1)
	,	tx_applicant_id_type				 		 =	ISNULL(@tx_applicant_id_type							, 	tx_applicant_id_type)
	,	tx_applicant_other_id				 		 =	ISNULL(@tx_applicant_other_id							, 	tx_applicant_other_id)
	,	tx_business_address					 		 =	ISNULL(@tx_business_address						, 	tx_business_address)
	,   tx_business_district					 	 =	ISNULL(@tx_business_district						, 	tx_business_district)
	,	tx_business_street_name					 	 =	ISNULL(@tx_business_street_name						, 	tx_business_street_name)
	,	tx_business_street_number					 =	ISNULL(@tx_business_street_number						, 	tx_business_street_number)
	,	tx_business_postal_code				 		 =	ISNULL(@tx_business_postal_code					, 	tx_business_postal_code)
	,	tx_business_country				 			 =	ISNULL(@tx_business_country					, 	tx_business_country)
	,	tx_applicant_owner_partner		 			 =	ISNULL(@tx_applicant_owner_partner		    , 	tx_applicant_owner_partner)
	,	tx_applicant_per_street_no				 	 =	ISNULL(@tx_applicant_per_street_no	, 	tx_applicant_per_street_no)
	,	tx_applicant_per_street_name		 		 =	ISNULL(@tx_applicant_per_street_name	, 	tx_applicant_per_street_name)
		WHERE   id_acquisition_applicant_key         = @_PRIMARY_KEY
        AND     is_active = 1 		 																
    }
    IF ( @tx_action_name = 'DELETE')
    {
        UPDATE _TABLE_NAME
        SET id_acquisition_applicant_ver  = id_acquisition_applicant_ver + 1
        , is_active = 0
        WHERE id_acquisition_applicant_key = @_PRIMARY_KEY
    }

    IF(@tx_action_name = 'SELECT_ACQUISITION_DETAILS')
    {
    	SELECT tx_rs_type = 'RS_TYPE_SELECT_ACQUISITION_DETAILS'
    	, TAD.*
    	FROM  T_ACQUISITION_APPLICANT_DETAILS TAD
    	WHERE TAD.id_credit_card_key = @id_credit_card_key
    	AND TAD.is_active = 1
    }

    IF(@tx_action_name = 'ACQUISITION_REPORT_DETAILS')
    {
    	SELECT  TAD.*
		INTO #TEMP_ACQ_REPORT
    	FROM  T_ACQUISITION_APPLICANT_DETAILS TAD
    	WHERE TAD.id_credit_card_key = @id_credit_card_key
    	AND TAD.is_active = 1

		SELECT tx_rs_type = 'RS_TYPE_ABOUT_YOUR_APPLICATION'
    	, ACQ.* 
    	FROM #TEMP_ACQ_REPORT ACQ

		SELECT tx_rs_type = 'RS_TYPE_CIB_INQUIRY'
    	, ACQ.* 
		, ACQ.tx_applicant_Present_address_street_num AS tx_applicant_present_address_street_num
		, ( CASE WHEN  ACQ.tx_applicant_gender 					= 'Male' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_cib_gen_male
		, ( CASE WHEN  ACQ.tx_applicant_gender 					= 'Female' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_cib_gen_female		
		, ( CASE WHEN  ACQ.tx_applicant_other_photoid 			= 'Passport' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_cib_id_type_passport					
		, ( CASE WHEN  ACQ.tx_applicant_other_photoid 			= 'Driving License' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_cib_id_type_driving
		, ( CASE WHEN  ACQ.tx_applicant_other_photoid 			= 'Birth Registration' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_cib_id_type_birth	
		, ( CASE WHEN  ACQ.tx_sector_type 			= 'Public' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_sector_private
		, ( CASE WHEN  ACQ.tx_sector_type 			= 'Private' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_sector_public		
		FROM #TEMP_ACQ_REPORT ACQ

	    SELECT tx_rs_type = 'RS_TYPE_YOURSELF_APPLICANT_DETAILS'
		, ACQ.* 
		, ( CASE WHEN  ACQ.tx_applicant_gender_neutral_title 	= 'Mr.' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_mr
		, ( CASE WHEN  ACQ.tx_applicant_gender_neutral_title 	= 'Ms.' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_ms
		, ( CASE WHEN  ACQ.tx_applicant_gender_neutral_title 	= 'Mrs.'			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_mrs
		, ( CASE WHEN  ACQ.tx_applicant_gender_neutral_title 	= 'Others'			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_ms_others
		, ( CASE WHEN  ACQ.tx_applicant_nationality 			= 'Bangladeshi' 	THEN 'radio1.png' ELSE 'radio2.png' END) AS f_national_ban
		, ( CASE WHEN  ACQ.tx_applicant_nationality 			= 'Others' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_national_others
		, ( CASE WHEN  ACQ.tx_applicant_gender 					= 'Male' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_gen_male
		, ( CASE WHEN  ACQ.tx_applicant_gender 					= 'Female' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_gen_female
		, ( CASE WHEN  ACQ.tx_applicant_gender 					= 'Third Gender' 	THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_gen_third
		, ( CASE WHEN  ACQ.tx_applicant_marital_status 			= 'Single' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_marr_sta_single
		, ( CASE WHEN  ACQ.tx_applicant_marital_status 			= 'Married' 		THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_marr_sta_married
		, ( CASE WHEN  ACQ.tx_applicant_highest_education 		= 'SSC' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_education_ssc
		, ( CASE WHEN  ACQ.tx_applicant_highest_education 		= 'HSC' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_education_hsc
		, ( CASE WHEN  ACQ.tx_applicant_highest_education 		= 'Graduate' 		THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_education_graduate
		, ( CASE WHEN  ACQ.tx_applicant_highest_education 		= 'Post Graduate' 	THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_education_post_gra
		, ( CASE WHEN  ACQ.tx_applicant_highest_education 		= 'Others'	 		THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_education_others
	    , ( CASE WHEN  ACQ.tx_applicant_other_photoid 			= 'Passport' 		THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_photoid_passport
		, ( CASE WHEN  ACQ.tx_applicant_other_photoid 			= 'Others'	 		THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_photoid_other 
	    FROM #TEMP_ACQ_REPORT ACQ

	    SELECT  tx_rs_type = 'RS_TYPE_APPLICANT_RESIDENCE'
       	, ACQ.* 
	    , ( CASE WHEN  ACQ.tx_applicant_resi_status 			= 'Owned' 			 THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_resi_status_own
		, ( CASE WHEN  ACQ.tx_applicant_resi_status 			= 'Family Owned' 	 THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_resi_status_family
		, ( CASE WHEN  ACQ.tx_applicant_resi_status 			= 'Rented' 			 THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_resi_status_rented
		, ( CASE WHEN  ACQ.tx_applicant_resi_status 			= 'Company Provided' THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_resi_status_company
		, ( CASE WHEN  ACQ.tx_applicant_resi_status 			= 'Others'	 		 THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_resi_status_others   
	    FROM #TEMP_ACQ_REPORT ACQ

	    SELECT tx_rs_type = 'RS_TYPE_ABOUT_YOUR_WORK'	
		, ACQ.* 
		, ( CASE WHEN  ACQ.tx_applicant_occupation 				= 'Service Holder' 	 THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_occupation_service
		, ( CASE WHEN  ACQ.tx_applicant_occupation 				= 'Businessman' 	 THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_occupation_business
		, ( CASE WHEN  ACQ.tx_applicant_occupation 				= 'Salaried' 		 THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_occupation_salaried
		, ( CASE WHEN  ACQ.tx_applicant_occupation 				= 'Others'	 		 THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_occupation_others   	   
	    , ( CASE WHEN  ACQ.tx_applicant_employee_status 		= 'Permanent' 		 THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_employee_status_per
		, ( CASE WHEN  ACQ.tx_applicant_employee_status 		= 'Contractual'	 	 THEN 'radio1.png' ELSE 'radio2.png' END) AS f_appli_employee_status_con  	   	    
		
	    FROM #TEMP_ACQ_REPORT ACQ

		SELECT tx_rs_type = 'RS_TYPE_REFERENCES_DETAILS'
		, SD.*
		, ( CASE WHEN  SD.tx_ref_profession 					= 'Service' 		  THEN 'radio1.png' ELSE 'radio2.png' END) AS f_ref_profession_service		
		, ( CASE WHEN  SD.tx_ref_profession 					= 'Self Employed'     THEN 'radio1.png' ELSE 'radio2.png' END) AS f_ref_profession_self		
		, ( CASE WHEN  SD.tx_ref_profession 					= 'Business' 		  THEN 'radio1.png' ELSE 'radio2.png' END) AS f_ref_profession_business	
		, ( CASE WHEN  SD.tx_ref_profession 					= 'Other' 			  THEN 'radio1.png' ELSE 'radio2.png' END) AS f_ref_profession_others
		FROM T_SUPPLEMENT_AND_REFER_DETAILS SD 
		JOIN #TEMP_ACQ_REPORT TAR ON TAR.id_supplement_and_refer_key = SD.id_supplement_and_refer_key
		AND SD.is_active = 1

		SELECT tx_rs_type = 'RS_TYPE_APPLICANT_SUPPLEMENT_DETAILS'
		, SD.*
		, ( CASE WHEN  SD.tx_relation_principal_applicant 		= 'Spouse' 				THEN 'radio1.png' ELSE 'radio2.png' END) AS f_supp_relation_spouse		
		, ( CASE WHEN  SD.tx_relation_principal_applicant 		= 'Parents' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_supp_relation_parents		
		, ( CASE WHEN  SD.tx_relation_principal_applicant 		= 'Brother/Sister' 		THEN 'radio1.png' ELSE 'radio2.png' END) AS f_supp_relation_brothers	
		, ( CASE WHEN  SD.tx_relation_principal_applicant 		= 'Child' 				THEN 'radio1.png' ELSE 'radio2.png' END) AS f_supp_relation_child					
		, ( CASE WHEN  SD.tx_relation_principal_applicant 		= 'Other' 				THEN 'radio1.png' ELSE 'radio2.png' END) AS f_supp_relation_others					
		, ( CASE WHEN  SD.tx_supp_applicant_occupation 			= 'Service' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_supp_occupation_service	
		, ( CASE WHEN  SD.tx_supp_applicant_occupation 			= 'Business' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_supp_occupation_business	
		, ( CASE WHEN  SD.tx_supp_applicant_occupation 			= 'Self Employed' 		THEN 'radio1.png' ELSE 'radio2.png' END) AS f_supp_occupation_self					
		, ( CASE WHEN  SD.tx_supp_applicant_occupation 			= 'Others' 				THEN 'radio1.png' ELSE 'radio2.png' END) AS f_supp_occupation_others							
		, ( CASE WHEN  SD.tx_supp_applicant_gender 				= 'Male' 				THEN 'radio1.png' ELSE 'radio2.png' END) AS f_supp_gender_male					
		, ( CASE WHEN  SD.tx_supp_applicant_gender 				= 'Female' 				THEN 'radio1.png' ELSE 'radio2.png' END) AS f_supp_gender_female	
		, ( CASE WHEN  SD.tx_supp_you_are_setup_limit_card 		= 'Yes' 				THEN 'radio1.png' ELSE 'radio2.png' END) AS f_supp_setup_limit_yes					
		, ( CASE WHEN  SD.tx_supp_you_are_setup_limit_card 		= 'No' 					THEN 'radio1.png' ELSE 'radio2.png' END) AS f_supp_setup_limit_no
		FROM T_SUPPLEMENT_AND_REFER_DETAILS SD
		JOIN #TEMP_ACQ_REPORT TAR ON TAR.id_supplement_and_refer_key = SD.id_supplement_and_refer_key
		AND SD.is_active = 1

		SELECT tx_rs_type = 'RS_TYPE_LETTER_OF_UNDERTAKING'
		, ACQ.* 
		, ( CASE WHEN  ACQ.tx_applicant_gender 					= 'Male' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_applicant_gender_male					
		, ( CASE WHEN  ACQ.tx_applicant_gender 					= 'Female' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_applicant_gender_female	
		, ( CASE WHEN  ACQ.tx_applicant_other_photoid 			= 'Passport' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_applicant_id_type_passport					
		, ( CASE WHEN  ACQ.tx_applicant_other_photoid 			= 'Driving License' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_applicant_id_type_driving
		, ( CASE WHEN  ACQ.tx_applicant_other_photoid 			= 'Birth Registration' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_applicant_id_type_birth		
	   FROM #TEMP_ACQ_REPORT ACQ

	    SELECT tx_rs_type = 'RS_TYPE_KYC_PROFILE'
		, ACQ.* 
		, ( CASE WHEN  ACQ.tx_passport_number_obtained 			= 'true' THEN 1 ELSE 0 END) AS is_passport_number_obtained
        , ( CASE WHEN  ACQ.tx_passport_number_verified 			= 'true' THEN 1 ELSE 0 END) AS is_passport_number_verified
        , ( CASE WHEN  ACQ.tx_nid_indetity_obtained 			= 'true' THEN 1 ELSE 0 END) AS is_nid_indetity_obtained
        , ( CASE WHEN  ACQ.tx_nid_indetity_verified 			= 'true' THEN 1 ELSE 0 END) AS is_nid_indetity_verified  
		, ( CASE WHEN  ACQ.tx_etin_id_identity_obtained 		= 'true' THEN 1 ELSE 0 END) AS is_etin_id_identity_obtained
        , ( CASE WHEN  ACQ.tx_etin_id_identity_verified 		= 'true' THEN 1 ELSE 0 END) AS is_etin_id_identity_verified 
		, ( CASE WHEN  ACQ.tx_spouse_employment_status 			= 'Salaried' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_spos_emp_sta_salaried	
		, ( CASE WHEN  ACQ.tx_spouse_employment_status 			= 'Self Employed' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_spos_emp_sta_self					
		, ( CASE WHEN  ACQ.tx_spouse_employment_status 			= 'Other' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_spos_emp_sta_others
		, ( CASE WHEN  ACQ.tx_member_ship_of_club 				= 'Yes' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_member_ship_yes					
		, ( CASE WHEN  ACQ.tx_member_ship_of_club 				= 'No' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_member_ship_no
	    , ( CASE WHEN  ACQ.tx_you_are_verified_customer 		= 'Yes' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_verified_customer_yes					
		, ( CASE WHEN  ACQ.tx_you_are_verified_customer 		= 'No' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_verified_customer_no
		, ( CASE WHEN  ACQ.tx_have_customer_own_car 			= 'Yes' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_car_brand_yes					
		, ( CASE WHEN  ACQ.tx_have_customer_own_car 			= 'No' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_car_brand_no
		, ( CASE WHEN  ACQ.tx_politically_exposed_person 		= 'Yes' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_politicall_yes					
		, ( CASE WHEN  ACQ.tx_politically_exposed_person 		= 'No' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_politicall_no
		, ( CASE WHEN  ACQ.tx_you_are_senior_managment 			= 'Yes' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_senior_managment_yes					
		, ( CASE WHEN  ACQ.tx_you_are_senior_managment 			= 'No' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_senior_managment_no
		, ( CASE WHEN  ACQ.tx_you_are_face_to_face_interview 	= 'Yes' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_face_interview_yes					
		, ( CASE WHEN  ACQ.tx_you_are_face_to_face_interview 	= 'No' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_face_interview_no
		, ( CASE WHEN  ACQ.tx_you_are_terrorist_activities 		= 'Yes' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_terrorist_yes					
		, ( CASE WHEN  ACQ.tx_you_are_terrorist_activities 		= 'No' 			THEN 'radio1.png' ELSE 'radio2.png' END) AS f_terrorist_no
		FROM #TEMP_ACQ_REPORT ACQ

		SELECT  tx_rs_type = 'RS_TYPE_DOCUMENT_CHECKLIST'
        ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'PASSPORT_SIZE_PHOTO' AND is_active = 1) THEN 1 ELSE 0 END) AS tx_passport_photo_upload_status
        ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'TIN' AND is_active = 1) THEN 1 ELSE 0 END) AS tx_tin_upload_status
        ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'BANK_STATEMENT' AND is_active = 1) THEN 1 ELSE 0 END) AS tx_bank_upload_status
        ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'TRADE_LICENSE' AND is_active = 1) THEN 1 ELSE 0 END) AS tx_trade_upload_status
        ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'SALARY_CERTIFICATE' AND is_active = 1) THEN 1 ELSE 0 END) AS tx_salary_certificate_upload_status
        ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'MEMORANDUM' AND is_active = 1) THEN 1 ELSE 0 END) AS tx_memorandum_upload_status
        ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'BP/CIV_ID_DOCUMENTS_COPY' AND is_active = 1) THEN 1 ELSE 0 END) AS tx_civ_upload_status
        ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'COPY_OF_VALID_PASSPORT' AND is_active = 1) THEN 1 ELSE 0 END) AS tx_valid_passport_upload_status
        FROM #TEMP_ACQ_REPORT

		SELECT tx_rs_type = 'RS_TYPE_APPLICANT_DOCUMENTS'
		, D.* FROM T_DOCUMENT D
		JOIN #TEMP_ACQ_REPORT TAR ON TAR.id_credit_card_key = D.id_ref_key AND D.is_active = 1

		SELECT tx_rs_type = 'RS_TYPE_PREVIOUS_ORGANIZATION_DETAILS'
		,ADC.* 
		FROM #TEMP_ACQ_REPORT TAR
		JOIN T_ACQUISITION_DETAILS_CONFIG ADC ON ADC.id_acquisition_applicant_key = TAR.id_acquisition_applicant_key
		WHERE ADC.tx_object_type = 'CREDIT_CARD'
        AND ADC.tx_group = 'CREDIT_CARD_ACQUISITION_FORM'
        AND ADC.tx_sub_group = 'PREVIOUS_ORGANIZATION_DETAILS'
		AND ADC.is_active = 1

		SELECT tx_rs_type = 'RS_TYPE_BANK_LIABILITY_POSTION'
		,ADC.* 
		FROM #TEMP_ACQ_REPORT TAR
		JOIN T_ACQUISITION_DETAILS_CONFIG ADC ON ADC.id_acquisition_applicant_key = TAR.id_acquisition_applicant_key
		WHERE ADC.tx_object_type = 'CREDIT_CARD'
        AND ADC.tx_group = 'CREDIT_CARD_ACQUISITION_FORM'
        AND ADC.tx_sub_group = 'BANK_LIABILITY_POSTION'
		AND ADC.is_active = 1

		SELECT tx_rs_type = 'RS_TYPE_OTHER_BANK_DETAILS'
		,ADC.* 
		FROM #TEMP_ACQ_REPORT TAR
		JOIN T_ACQUISITION_DETAILS_CONFIG ADC ON ADC.id_acquisition_applicant_key = TAR.id_acquisition_applicant_key
		WHERE ADC.tx_object_type = 'CREDIT_CARD'
        AND ADC.tx_group = 'CREDIT_CARD_ACQUISITION_FORM'
        AND ADC.tx_sub_group = 'OTHER_BANK_DETAILS'
		AND ADC.is_active = 1

		SELECT tx_rs_type = 'RS_TYPE_SECURITY_DETAILS'
		,ROW_NUMBER() OVER (ORDER BY ADC.id_acquisition_details_config_key) AS int_sl
		,ADC.* 
		FROM #TEMP_ACQ_REPORT TAR
		JOIN T_ACQUISITION_DETAILS_CONFIG ADC ON ADC.id_acquisition_applicant_key = TAR.id_acquisition_applicant_key
		WHERE ADC.tx_object_type = 'CREDIT_CARD'
        AND ADC.tx_group = 'CREDIT_CARD_ACQUISITION_FORM'
        AND ADC.tx_sub_group = 'SECURITY_DETAILS'
		AND ADC.is_active = 1

		SELECT tx_rs_type = 'RS_TYPE_COMPANIES_UNDER_OWNER_SHIP'
		, ROW_NUMBER() OVER (ORDER BY ADC.id_acquisition_details_config_key) AS int_sl
		,ADC.* 
		FROM #TEMP_ACQ_REPORT TAR
		JOIN T_ACQUISITION_DETAILS_CONFIG ADC ON ADC.id_acquisition_applicant_key = TAR.id_acquisition_applicant_key
		WHERE ADC.tx_object_type = 'CREDIT_CARD'
		AND ADC.tx_group = 'CREDIT_CARD_ACQUISITION_FORM'
		AND ADC.tx_sub_group = 'COMPANIES_UNDER_OWNER_SHIP'
		AND ADC.is_active = 1
    }

    _SP_FOOTER
}
go

_GRANT_PERM_SP