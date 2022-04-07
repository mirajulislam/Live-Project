/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islamn
* Date          : 31 OCT 2021
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {UPD_user_registration};
#define _TABLE_NAME     {T_USER_REGISTRATION};
#define _PRIMARY_KEY    {id_user_login_key};
#define _VERSION        {id_user_login_var};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    , 	@_PRIMARY_KEY                   INT                    		= NULL       OUTPUT
    , 	@_VERSION                       INT                    		= NULL
    
    ,	@dtt_create						DATETIME	
    ,	@tx_customer_id					VARCHAR(256)   				= NULL		OUTPUT
	,	@tx_bp_no						VARCHAR(256)   				= NULL
	,	@tx_customer_name				VARCHAR(256)   				= NULL
	,	@tx_designation					VARCHAR(256)   				= NULL
	,	@tx_nid							VARCHAR(256)   				= NULL
	,	@tx_mobile						VARCHAR(256)   				= NULL
	,	@tx_login_name					VARCHAR(256)   				= NULL
	,	@tx_password					VARCHAR(256)   				= NULL
	,	@tx_imei_number					VARCHAR(256)   				= NULL
	,	@tx_first_name					VARCHAR(256)   				= NULL
	,	@tx_last_name					VARCHAR(256)   				= NULL
	,	@is_in_vacation					INT 						= NULL	
	,	@tx_email						VARCHAR(256)   				= NULL
	,	@tx_success_status				VARCHAR(256)   				= NULL
	,	@id_user_key					INT 						= NULL
	,	@is_allow_login					INT 						= NULL
	,	@is_first_login					INT 						= NULL
	,	@is_disabled					INT   						= NULL
	,	@tx_user_alias					VARCHAR(256)   				= NULL
	,	@id_group_key					INT 						= NULL
	,	@id_legal_entity_key			INT 						= NULL
	,	@tx_app_name					VARCHAR(256)   				= NULL
	,	@tx_security_question1			VARCHAR(256)   				= NULL
	,	@tx_security_question2			VARCHAR(256)   				= NULL
	,	@tx_security_question3			VARCHAR(256)   				= NULL
	,	@tx_security_answer1			VARCHAR(256)   				= NULL
	,	@tx_security_answer2			VARCHAR(256)   				= NULL
	,	@tx_security_answer3			VARCHAR(256)   				= NULL
	,	@dtt_date_of_birth				DATETIME					= NULL
	,	@tx_tin							VARCHAR(256)   				= NULL

    _SP_PARAM_FOOTER
AS
{
	_SP_HEADER

	IF ( NOT ((@tx_password IS NULL) OR (@tx_password = '?')) )
	{
		SELECT @tx_password = EncryptByPassPhrase(CONVERT(varchar, @id_user_key), @tx_password)
	}

	SELECT @id_user_login_var = (SELECT id_user_login_var FROM T_USER_REGISTRATION WHERE id_user_key = @id_user_key)

	UPDATE _TABLE_NAME
    SET 
    _TABLE_HEADER_UPD_WITH_STATE
    , 	id_user_login_var           = 	@id_user_login_var + 1
    ,	tx_customer_id				=   ISNULL(@tx_customer_id				,	tx_customer_id		)		
	,	tx_bp_no					=   ISNULL(@tx_bp_no					,	tx_bp_no			)		
	,	tx_customer_name			=   ISNULL(@tx_customer_name			,	tx_customer_name	)		
	,	tx_designation				=   ISNULL(@tx_designation				,	tx_designation		)		
	,	tx_nid						=   ISNULL(@tx_nid						,	tx_nid				)		
	,	tx_mobile					=   ISNULL(@tx_mobile					,	tx_mobile			)		
	,	tx_login_name				=   ISNULL(@tx_login_name				,	tx_login_name		)		
	,	tx_password					=   ISNULL(@tx_password					,	tx_password			)
	,	tx_imei_number				=   ISNULL(@tx_imei_number				,	tx_imei_number		)		
	,	tx_first_name				=   ISNULL(@tx_first_name				,	tx_first_name		)		
	,	tx_last_name				=   ISNULL(@tx_last_name				,	tx_last_name		)		
	,	is_in_vacation				=   ISNULL(@is_in_vacation				,	is_in_vacation		)		
	,	is_first_login				=   ISNULL(@is_first_login				,	is_first_login		)		
	,	tx_email					=   ISNULL(@tx_email					,	tx_email			)		
	,	tx_success_status			=   ISNULL(@tx_success_status			,	tx_success_status	)			
	,	id_user_key					=   ISNULL(@id_user_key					,	id_user_key			)
	,	is_allow_login				=   ISNULL(@is_allow_login				,	is_allow_login		)		
	,	is_disabled					=   ISNULL(@is_disabled					,	is_disabled			)
	,	tx_user_alias				=   ISNULL(@tx_user_alias				,	tx_user_alias		)		
	,	id_group_key				=   ISNULL(@id_group_key				,	id_group_key		)		
	,	id_legal_entity_key			=   ISNULL(@id_legal_entity_key			,	id_legal_entity_key	)
	,	tx_app_name					=   ISNULL(@tx_app_name					,	tx_app_name			)
	,	tx_security_question1		=   ISNULL(@tx_security_question1		,	tx_security_question1)
	,	tx_security_question2		=   ISNULL(@tx_security_question2		,	tx_security_question2)
	,	tx_security_question3		=   ISNULL(@tx_security_question3		,	tx_security_question3)
	,	tx_security_answer1			=   ISNULL(@tx_security_answer1			,	tx_security_answer1	)
	,	tx_security_answer2			=   ISNULL(@tx_security_answer2			,	tx_security_answer2	)
	,	tx_security_answer3			=   ISNULL(@tx_security_answer3			,	tx_security_answer3	)
	, 	dtt_date_of_birth           = 	ISNULL(@dtt_date_of_birth           ,	dtt_date_of_birth	)
	, 	tx_tin                      = 	ISNULL(@tx_tin                      ,	tx_tin 				)
	WHERE id_user_key         		= @id_user_key
	_TOUCHED_TABLE(_TABLE_NAME)

    _SP_FOOTER

    RETURN _STATUS_OK
}
go

_GRANT_PERM_SP
