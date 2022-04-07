/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islamn
* Date          : 31 OCT 2021
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_user_registration};
#define _TABLE_NAME     {T_USER_REGISTRATION};
#define _PRIMARY_KEY    {id_user_login_key};
#define _VERSION        {id_user_login_var};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    , 	@_PRIMARY_KEY                   INT                    		= NULL       OUTPUT
    , 	@_VERSION                       INT                    		= NULL  

    ,	@dtt_create						DATETIME					= NULL
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
	IF(@tx_action_name = 'SELECT_PASSWORD_FOR_UPDATE')
	{
	 	 SELECT tx_rs_type = 'RS_TYPE_SELECT_USER_DETAILS'
	 	 , id_user_key
	 	 , tx_login_name
	 	 , CONVERT(varchar, DECRYPTBYPASSPHRASE(CONVERT(varchar, id_user_key), tx_password)) as tx_password
	 	 FROM T_USER_REGISTRATION 
	 	 where id_user_key = @id_user_key
	}
	if(@tx_action_name = 'SELECT_USER_FOR_FORGOT')
	{
		SELECT  tx_rs_type = 'RS_TYPE_SELECT_USER_DETAILS' 
		, UR.*
		,u.id_user_ver
		FROM T_USER_REGISTRATION UR 
		JOIN T_USER u on u.id_user_key = ur.id_user_key
        WHERE  UR.tx_mobile LIKE '+88%'+(@tx_mobile)
        OR  UR.tx_mobile LIKE (@tx_mobile)
        AND CAST(UR.dtt_date_of_birth AS DATE) = ISNULL(CAST(@dtt_date_of_birth AS DATE) ,UR.dtt_date_of_birth)       
        AND UR.is_active=1
	}	

	IF(@tx_action_name = 'SELECT')
	{
	 	 SELECT tx_rs_type = 'RS_TYPE_SELECT_USER_DETAILS'
	 	 , UR.*
	 	 FROM T_USER_REGISTRATION UR
	 	 where id_user_key = @id_user_key
	}

	IF(@tx_action_name = 'NEW')
	{
		EXEC @g_id_return_status = INS_user_registration

            _SP_ARGS_HEADER
															
            ,   @_PRIMARY_KEY           				=	@_PRIMARY_KEY                 
            ,   @_VERSION               				=	@_VERSION 
															
            ,	@dtt_create								=	@dtt_create																			
			,	@tx_customer_id							=	@tx_customer_id																		
			,	@tx_bp_no								=	@tx_bp_no																			
			,	@tx_customer_name						=	@tx_customer_name																	
			,	@tx_designation							=	@tx_designation																		
			,	@tx_nid									=	@tx_nid																				
			,	@tx_mobile								=	@tx_mobile																			
			,	@tx_login_name							=	@tx_login_name																		
			,	@tx_password							=	@tx_password																		
			,	@tx_imei_number							=	@tx_imei_number																		
			,	@tx_first_name							=	@tx_first_name																		
			,	@tx_last_name							=	@tx_last_name																		
			,	@is_in_vacation							=	@is_in_vacation																																				
			,	@tx_email								=	@tx_email																			
			,	@tx_success_status						=	@tx_success_status																																			
			,	@id_user_key							=	@id_user_key																																			
			,	@is_allow_login							=	@is_allow_login
			,	@is_first_login							=	@is_first_login																		
			,	@is_disabled							=	@is_disabled																		
			,	@tx_user_alias							=	@tx_user_alias																		
			,	@id_group_key							=	@id_group_key																		
			,	@id_legal_entity_key					=	@id_legal_entity_key																
			,	@tx_app_name							=	@tx_app_name																		
			,	@tx_security_question1					=	@tx_security_question1																
			,	@tx_security_question2					=	@tx_security_question2																
			,	@tx_security_question3					=	@tx_security_question3																
			,	@tx_security_answer1					=	@tx_security_answer1																
			,	@tx_security_answer2					=	@tx_security_answer2																
			,	@tx_security_answer3					=	@tx_security_answer3
			,	@dtt_date_of_birth						=	@dtt_date_of_birth			
			,	@tx_tin									=	@tx_tin									 
           
            _RETURN_IF_SP_ERROR(INS_user_registration)
	}

	IF( @tx_action_name IN (_ACTION_UPDATE))
	{
		EXEC @g_id_return_status = UPD_user_registration

            _SP_ARGS_HEADER
            ,   @_PRIMARY_KEY           				=	@_PRIMARY_KEY                 
            ,   @_VERSION               				=	@_VERSION 
															
            ,	@dtt_create								=	@dtt_create																			
			,	@tx_customer_id							=	@tx_customer_id																		
			,	@tx_bp_no								=	@tx_bp_no																			
			,	@tx_customer_name						=	@tx_customer_name																	
			,	@tx_designation							=	@tx_designation																		
			,	@tx_nid									=	@tx_nid																				
			,	@tx_mobile								=	@tx_mobile																			
			,	@tx_login_name							=	@tx_login_name																		
			,	@tx_password							=	@tx_password																		
			,	@tx_imei_number							=	@tx_imei_number																		
			,	@tx_first_name							=	@tx_first_name																		
			,	@tx_last_name							=	@tx_last_name																		
			,	@is_in_vacation							=	@is_in_vacation																																				
			,	@tx_email								=	@tx_email																			
			,	@tx_success_status						=	@tx_success_status																																			
			,	@id_user_key							=	@id_user_key																																			
			,	@is_allow_login							=	@is_allow_login
			,	@is_first_login							=	@is_first_login																		
			,	@is_disabled							=	@is_disabled																		
			,	@tx_user_alias							=	@tx_user_alias																		
			,	@id_group_key							=	@id_group_key																		
			,	@id_legal_entity_key					=	@id_legal_entity_key																
			,	@tx_app_name							=	@tx_app_name																		
			,	@tx_security_question1					=	@tx_security_question1																
			,	@tx_security_question2					=	@tx_security_question2																
			,	@tx_security_question3					=	@tx_security_question3																
			,	@tx_security_answer1					=	@tx_security_answer1																
			,	@tx_security_answer2					=	@tx_security_answer2																
			,	@tx_security_answer3					=	@tx_security_answer3
			,	@dtt_date_of_birth						=	@dtt_date_of_birth			
			,	@tx_tin									=	@tx_tin	
            _RETURN_IF_SP_ERROR(UPD_user_registration)
	}
	_SP_FOOTER
}
go

_GRANT_PERM_SP