
/* __CC_INFO__  : */
/******************************************************************************
* File Name   : NSMART_GENERIC_MAP_H.h
* Description : GeneralMap Header File
* Author      : Naz Ahmed
******************************************************************************/

#ifndef NSMART_GENERIC_MAP_H
#define NSMART_GENERIC_MAP_H	{};


#define _UPDATE_MAPPED_SSI_VERSION(_ssi_key_, _ssi_ver_, _ssi_type_name_)
{
	_UPDATE_TO_GENERIC_MAPPING(_ssi_key_, _ssi_ver_, _ssi_type_name_, NULL)
};


#define _UPDATE_MAPPED_CORP_VERSION(_corp_key_, _corp_ver_, _corp_type_)
{
	_UPDATE_FROM_GENERIC_MAPPING(_corp_key_, _corp_ver_, _corp_type_, NULL)
};


#define _UPDATE_MAPPED_VALUABLE_VERSION(_valuable_key_, _valuable_ver_, _valuable_type_)
{
	_UPDATE_FROM_GENERIC_MAPPING(_valuable_key_, _valuable_ver_, _valuable_type_, NULL)
};


#define _UPDATE_MAPPED_PERSON_VERSION(_person_key_, _person_ver_, _person_type_)
{
	_UPDATE_FROM_GENERIC_MAPPING(_person_key_, _person_ver_, _person_type_, NULL)
};


#endif