/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islam
* Date          : 31 OCT 2021
* Description   : Table app USER REGISTRATION
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_USER_REGISTRATION_AUDIT};
#define _PRIMARY_KEY		{id_user_login_key};
#define _VERSION			{id_user_login_var};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(		
	 	_PRIMARY_KEY					INT							NOT NULL
	,	_VERSION				  	 	INT						    NOT NULL
	,	_TABLE_HEADER_WITH_STATE	
	
	,	dtt_create						DATETIME					NOT NULL		
	,	tx_customer_id					VARCHAR(256)   				NOT NULL
	,	tx_bp_no						VARCHAR(256)   				NOT NULL
	,	tx_customer_name				VARCHAR(256)   				NOT NULL
	,	tx_designation					VARCHAR(256)   				NOT NULL
	,	tx_nid							VARCHAR(256)   				NOT NULL
	,	tx_mobile						VARCHAR(256)   				NOT NULL
	,	tx_login_name					VARCHAR(256)   				NOT NULL
	,	tx_password						VARCHAR(256)   				NOT NULL
	,	tx_imei_number					VARCHAR(256)   				NOT NULL
	,	tx_first_name					VARCHAR(256)   				NOT NULL
	,	tx_last_name					VARCHAR(256)   				NOT NULL
	,	is_in_vacation					INT 						NOT NULL
	,	tx_email						VARCHAR(256)   				NOT NULL
	,	tx_success_status				VARCHAR(256)   				NOT NULL
	,	id_user_key						INT 						NOT NULL
	,	is_allow_login					INT 						NOT NULL
	,	is_first_login					INT 						NOT NULL
	,	is_disabled						INT   						NOT NULL
	,	tx_user_alias					VARCHAR(256)   				NOT NULL
	,	id_group_key					INT 						NOT NULL
	,	id_legal_entity_key				INT 						NOT NULL
	,	tx_app_name						VARCHAR(256)   				NOT NULL
	,	tx_security_question1			VARCHAR(256)   				NOT NULL
	,	tx_security_question2			VARCHAR(256)   				NOT NULL
	,	tx_security_question3			VARCHAR(256)   				NOT NULL
	,	tx_security_answer1				VARCHAR(256)   				NOT NULL
	,	tx_security_answer2				VARCHAR(256)   				NOT NULL
	,	tx_security_answer3				VARCHAR(256)   				NOT NULL
	, 	dtt_date_of_birth               DATETIME                        NULL
	, 	tx_tin                          VARCHAR(256)                NOT NULL
)

go

_GRANT_PERM_TBL