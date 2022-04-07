/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islam
* Date          : 02 JAN 2022
* Description   : Table for Acquisition form other table related data 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_ACQUISITION_DETAILS_CONFIG};
#define _PRIMARY_KEY		{id_acquisition_details_config_key};
#define _VERSION			{id_acquisition_details_config_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	  _PRIMARY_KEY					 						INT	IDENTITY(100000,1)		NOT NULL
	, _VERSION					  	 						INT						    NOT NULL			

	,	is_active											INT                    		NOT NULL
	,	id_env_key											INT                    		NOT NULL
	,	id_user_mod_key										INT                    		NOT NULL
	,	dtt_mod												DATETIME        			NOT NULL
	,	dtt_create											DATETIME        			NOT NULL	
	,	id_event_key										INT                    		NOT NULL
	,	id_creator_key										INT                    		NOT NULL
	,	id_acquisition_applicant_key						INT            				NOT NULL
	,	tx_organization_name								VARCHAR(256)                NOT NULL														
	,	tx_designation										VARCHAR(256)                NOT NULL															
	,	dec_service_length									DECIMAL(20, 2) 				NOT NULL																																															
	,	tx_loan_type										VARCHAR(256)                NOT NULL																
	,	tx_financial_institution_name						VARCHAR(256)                NOT NULL												
	,	tx_loanacno_or_card_no								VARCHAR(256)                NOT NULL														
	,	dec_sanction_limit									DECIMAL(20, 2) 				NOT NULL																																		
	,	tx_validity											VARCHAR(256)                NOT NULL																
	,	dec_present_out_standing							DECIMAL(20, 2) 				NOT NULL																																	
	,	dec_emi												DECIMAL(20, 2) 				NOT NULL																																																		
	,	tx_account_title									VARCHAR(256)                NOT NULL															
	,	tx_bank_name										VARCHAR(256)                NOT NULL															
	,	tx_branch_name										VARCHAR(256)                NOT NULL																
	,	tx_account_no										VARCHAR(256)                NOT NULL															
	,	tx_security_type									VARCHAR(256)                NOT NULL															
	,	tx_beneficiary										VARCHAR(256)                NOT NULL																	
	,	dec_rate											DECIMAL(20, 2) 				NOT NULL																																			
	,	tx_ac_instrument_no									VARCHAR(256)                NOT NULL																
	,	dtt_issue_date										DATETIME       				NOT NULL														
	,	tx_face_value										VARCHAR(256)                NOT NULL																
	,	tx_present_value									VARCHAR(256)                NOT NULL															
	,	tx_company_name										VARCHAR(256)                NOT NULL															
	,	tx_main_address										VARCHAR(256)                NOT NULL															
	,	tx_additional_address								VARCHAR(256)                NOT NULL														
	,	tx_availing_any_loan_this_company					VARCHAR(256)                NOT NULL										
	,	tx_name_of_company_bank								VARCHAR(256)                NOT NULL														
	,	tx_branch_of_company_bank							VARCHAR(256)                NOT NULL													
	,	tx_object_type										VARCHAR(256)                NOT NULL															
	,	tx_inputed_by										VARCHAR(256)                NOT NULL																
	,	tx_group											VARCHAR(256)                NOT NULL																	
	,	tx_sub_group										VARCHAR(256)                NOT NULL

	, 	CONSTRAINT pk_id_acquisition_details_config_id PRIMARY KEY  CLUSTERED(_PRIMARY_KEY)
)

go

_GRANT_PERM_TBL