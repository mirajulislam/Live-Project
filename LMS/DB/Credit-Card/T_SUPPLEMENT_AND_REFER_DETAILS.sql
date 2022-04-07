/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islam
* Date          : 02 JAN 2022
* Description   : Table for Acquisition Applicant Details
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_SUPPLEMENT_AND_REFER_DETAILS};
#define _PRIMARY_KEY		{id_supplement_and_refer_key};
#define _VERSION			{id_supplement_and_refer_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	_PRIMARY_KEY					 					INT	IDENTITY(100000,1)		NOT NULL
, 	_VERSION											INT                    		NOT NULL							
																							
,	is_active											INT                    		NOT NULL
,	id_env_key											INT                    		NOT NULL
,	id_user_mod_key										INT                    		NOT NULL
,	dtt_mod												DATETIME        			NOT NULL
,	dtt_create											DATETIME        			NOT NULL	
,	id_event_key										INT                    		NOT NULL
,	id_creator_key										INT                    		NOT NULL
,	tx_supp_applicant_name								VARCHAR(256)                NOT NULL												
,	tx_relation_principal_applicant						VARCHAR(256)                NOT NULL																	
,	tx_relation_principal_applicant_others				VARCHAR(256)                NOT NULL																				
,	tx_supp_applicant_gender							VARCHAR(256)                NOT NULL											
,	dtt_supp_applicant_dateof_birth						DATETIME        			NOT NULL
,	tx_supp_applicant_occupation						VARCHAR(256)                NOT NULL														
,	tx_supp_applicant_father_name						VARCHAR(256)                NOT NULL													
,	tx_supp_applicant_mother_name						VARCHAR(256)                NOT NULL												
,	tx_supp_applicant_spouse_name						VARCHAR(256)                NOT NULL															
,	tx_supp_applicant_present_address					VARCHAR(256)                NOT NULL															
,	tx_supp_applicant_per_address						VARCHAR(256)                NOT NULL														
,	tx_supp_applicant_mobile							VARCHAR(256)                NOT NULL												
,	tx_supp_applicant_email								VARCHAR(256)                NOT NULL															
,	tx_supp_applicant_nid								VARCHAR(256)                NOT NULL												
,	tx_supp_applicant_passport							VARCHAR(256)                NOT NULL															
,	dtt_supp_applicant_dateof_exp						DATETIME        			NOT NULL
,	tx_supp_you_are_setup_limit_card					VARCHAR(256)                NOT NULL								
,	dec_supp_set_up_limit_bd_amount						DECIMAL(20, 2) 				NOT NULL
,	dec_supp_set_up_limit_percent						DECIMAL(20, 2) 				NOT NULL
,	dec_supp_set_up_limit_usd_amount					DECIMAL(20, 2) 				NOT NULL
,	tx_ref_name											VARCHAR(256)                NOT NULL								
,	tx_ref_relation_with_applicant						VARCHAR(256)                NOT NULL								
,	tx_ref_profession									VARCHAR(256)                NOT NULL								
,	tx_ref_org_name										VARCHAR(256)                NOT NULL								
,	tx_ref_designation									VARCHAR(256)                NOT NULL								
,	tx_ref_workor_residence_address						VARCHAR(256)                NOT NULL								
,	tx_ref_telephone									VARCHAR(256)                NOT NULL								
,	tx_ref_mobile										VARCHAR(256)                NOT NULL								
,	tx_ref_email										VARCHAR(256)                NOT NULL							
, 	CONSTRAINT pk_id_supplement_and_refer_key PRIMARY KEY  CLUSTERED(_PRIMARY_KEY)
)
go

_GRANT_PERM_TBL