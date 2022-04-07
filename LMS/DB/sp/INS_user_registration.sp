/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islamn
* Date          : 31 OCT 2021
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {INS_user_registration};
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

    _INIT_VERSION(@_VERSION)
    IF ( NOT ((@tx_password IS NULL) OR (@tx_password = '?')) )
	{
		SELECT @tx_password = EncryptByPassPhrase(CONVERT(varchar, @id_user_key), @tx_password)
	}

    INSERT INTO _TABLE_NAME
    (
        id_user_login_var
    ,   _TABLE_HEADER_INS_FIELD_WITH_STATE
    ,	dtt_create			
	,	tx_customer_id		
	,	tx_bp_no			
	,	tx_customer_name	
	,	tx_designation		
	,	tx_nid				
	,	tx_mobile			
	,	tx_login_name		
	,	tx_password		
	,	tx_imei_number		
	,	tx_first_name		
	,	tx_last_name		
	,	is_in_vacation		
	,	is_first_login		
	,	tx_email			
	,	tx_success_status			
	,	id_user_key		
	,	is_allow_login		
	,	is_disabled		
	,	tx_user_alias		
	,	id_group_key		
	,	id_legal_entity_key
	,	tx_app_name		
	,	tx_security_question1
	,	tx_security_question2
	,	tx_security_question3
	,	tx_security_answer1
	,	tx_security_answer2
	,	tx_security_answer3
	,	dtt_date_of_birth
	,	tx_tin			
    )
    VALUES
    (  
            @_VERSION
        ,   _TABLE_HEADER_INS_VAL_WITH_STATE

        , GETDATE()
		, ISNULL(@tx_customer_id			,				_DB_NULL_STR)
		, ISNULL(@tx_bp_no					,				_DB_NULL_STR)
		, ISNULL(@tx_customer_name			,				_DB_NULL_STR)
		, ISNULL(@tx_designation			,				_DB_NULL_STR)
		, ISNULL(@tx_nid					,				_DB_NULL_STR)
		, ISNULL(@tx_mobile					,				_DB_NULL_STR)
		, ISNULL(@tx_login_name				,				_DB_NULL_STR)
		, ISNULL(@tx_password				,				_DB_NULL_STR)
		, ISNULL(@tx_imei_number			,				_DB_NULL_STR)
		, ISNULL(@tx_first_name				,				_DB_NULL_STR)
		, ISNULL(@tx_last_name				,				_DB_NULL_STR)
		, ISNULL(@is_in_vacation			,				_DB_NULL_INT)	
		, ISNULL(@is_first_login			,				_DB_NULL_INT)
		, ISNULL(@tx_email					,				_DB_NULL_STR)
		, ISNULL(@tx_success_status			,				_DB_NULL_STR)
		, ISNULL(@id_user_key				,				_DB_NULL_INT)
		, ISNULL(@is_allow_login			,				_DB_NULL_INT)	
		, ISNULL(@is_disabled				,				_DB_NULL_INT)
		, ISNULL(@tx_user_alias				,				_DB_NULL_STR)
		, ISNULL(@id_group_key				,				_DB_NULL_INT)
		, ISNULL(@id_legal_entity_key		,				_DB_NULL_INT)
		, ISNULL(@tx_app_name				,				_DB_NULL_STR)
		, ISNULL(@tx_security_question1		,				_DB_NULL_STR)
		, ISNULL(@tx_security_question2		,				_DB_NULL_STR)
		, ISNULL(@tx_security_question3		,				_DB_NULL_STR)
		, ISNULL(@tx_security_answer1		,				_DB_NULL_STR)
		, ISNULL(@tx_security_answer2		,				_DB_NULL_STR)
		, ISNULL(@tx_security_answer3		,				_DB_NULL_STR)
		, @dtt_date_of_birth		
		, ISNULL(@tx_tin					,				_DB_NULL_STR)				
    )

	SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_USER_REGISTRATION')

    _STORE_SYS_VARS
    SELECT @g_tx_err_msg = _GEM_INSERT(_TABLE_NAME, @_PRIMARY_KEY)
    
    _HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)

    _TOUCHED_TABLE(_TABLE_NAME)

    _SP_FOOTER

    RETURN _STATUS_OK
}
go

_GRANT_PERM_SP