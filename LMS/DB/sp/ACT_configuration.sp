/* __VER_INFO__  :  */
/******************************************************************************
* Author		: Kh. Kamruzzaman
* Date			: 2019-12-29
* Description	: 
******************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME 			{ACT_configuration};
#define _TABLE_NAME 		{T_CONFIGURATION};
#define _PRIMARY_KEY		{id_configuration_key};
#define _VERSION			{id_configuration_ver};


_DROP_PROC

_CREATE_PROC (_SP_NAME)

	_SP_PARAM_HEADER

		, @_PRIMARY_KEY					int								= NULL		OUTPUT
		, @_VERSION						int								= NULL		OUTPUT
		, @tx_group						varchar(256)					= NULL		
		, @tx_sub_group					varchar(256)					= NULL		
		, @tx_name						varchar(256)					= NULL		
		, @tx_value1					varchar(256)					= NULL		
		, @tx_value2					varchar(256)					= NULL		
		, @tx_value3					varchar(256)					= NULL		
		, @tx_desc						varchar(256)					= NULL		
		, @tx_comment					varchar(256)					= NULL
		, @tx_value_type				varchar(256)					= NULL	
		, @int_include_authorized		int 							= 0
		, @tx_block_nostro				int								= 0	
		, @int_read_only					int 						= NULL
		, @tx_modified_by				varchar(128)					= NULL

	_SP_PARAM_FOOTER
AS
{

	_SP_HEADER

	IF ( @tx_action_name = _ACTION_NEW )
	{

		EXEC @g_id_return_status = INS_configuration
							
							  _SP_ARGS_HEADER

							, @_PRIMARY_KEY   			= @_PRIMARY_KEY  	OUTPUT
							, @_VERSION 				= @_VERSION		OUTPUT
							, @tx_group					= @tx_group	
							, @tx_sub_group				= @tx_sub_group	
							, @tx_name 					= @tx_name 
							, @tx_value1				= @tx_value1
							, @tx_value2				= @tx_value2
							, @tx_value3				= @tx_value3	
							, @tx_desc					= @tx_desc	
							, @tx_comment				= @tx_comment
							, @tx_value_type			= @tx_value_type
							, @int_include_authorized 	= @int_include_authorized
							, @int_read_only				= @int_read_only

		SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_CONFIGURATION');
		
		_RETURN_IF_SP_ERROR(INS_configuration)
	}
	IF ( @tx_action_name = _ACTION_SELECT )
	{
		EXEC @g_id_return_status = SEL_configuration
							  
							  _SP_ARGS_HEADER

							, @_PRIMARY_KEY   			= @_PRIMARY_KEY  	OUTPUT
							, @_VERSION 				= @_VERSION		OUTPUT
							, @tx_group					= @tx_group	
							, @tx_sub_group				= @tx_sub_group	
							, @tx_name 					= @tx_name 
							, @tx_value1				= @tx_value1
							, @tx_value2				= @tx_value2
							, @tx_value3				= @tx_value3	
							, @tx_desc					= @tx_desc	
							, @tx_comment				= @tx_comment
							, @tx_value_type			= @tx_value_type
							, @int_include_authorized 	= @int_include_authorized
							, @int_read_only				= @int_read_only	
							, @tx_modified_by			= @tx_modified_by		


		_RETURN_IF_SP_ERROR(SEL_configuration)
	}

	IF (@tx_action_name = _ACTION_DELETE)
	{	
		_SET_ACTION(_ACTION_UPDATE)
		, @is_active = 0
	}

	IF( @tx_action_name = _ACTION_UPDATE )
	{
	
		EXEC @g_id_return_status = UPD_configuration
							  
							  _SP_ARGS_HEADER

							, @_PRIMARY_KEY   			= @_PRIMARY_KEY  	OUTPUT
							, @_VERSION 				= @_VERSION		OUTPUT
							, @tx_group					= @tx_group	
							, @tx_sub_group				= @tx_sub_group	
							, @tx_name 					= @tx_name 
							, @tx_value1				= @tx_value1
							, @tx_value2				= @tx_value2
							, @tx_value3				= @tx_value3	
							, @tx_desc					= @tx_desc	
							, @tx_comment				= @tx_comment
							, @tx_value_type			= @tx_value_type
							, @int_read_only			= @int_read_only


		_RETURN_IF_SP_ERROR(UPD_configuration)

	}

	_SP_FOOTER
}
go


_GRANT_PERM_SP