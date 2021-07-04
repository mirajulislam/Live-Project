/* __VER_INFO__  :  */
/******************************************************************************
* Author    : Kh. Assaduzzaman Sohan
* Date      : 15 May 2019
* Description : Table of T_CONFIGURATION for OFAC
******************************************************************************/

#include <nSMART_SQL.h>

#define _TABLE_NAME        {T_CONFIGURATION};
#define _TABLE_NAME_AUDIT  {T_CONFIGURATION_AUDIT};
#define _PRIMARY_KEY       {id_configuration_key};
#define _VERSION           {id_configuration_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME)
(
  _PRIMARY_KEY            int  identity(100000, 1)             NOT NULL
  , _VERSION              int               NOT NULL
  , _TABLE_HEADER_WITH_STATE

  , tx_group              varchar(_L_GROUP)
  , tx_sub_group          varchar(_L_SUB_GROUP)    
  , tx_name               varchar(_L_NAME) 
  , tx_value1             varchar(_L_VALUE1)    
  , tx_value2             varchar(_L_VALUE2)    
  , tx_value3             varchar(_L_VALUE3)
  , tx_desc               varchar (_L_DESC)       
  , tx_comment            varchar(_L_COMMENT) 
  , tx_value_type         varchar(64)
  , int_read_only          int   

  , CONSTRAINT pk_configuration_key  PRIMARY KEY CLUSTERED (_PRIMARY_KEY)
)
go

_GRANT_PERM_TBL
