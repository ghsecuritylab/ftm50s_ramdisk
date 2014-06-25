/*
 * Note: this file originally auto-generated by mib2c using
 *  : mib2c.column_enums.conf,v 5.1 2002/05/08 05:42:47 hardaker Exp $
 */
#ifndef IPCIDRROUTETABLE_ENUMS_H
#define IPCIDRROUTETABLE_ENUMS_H

/*
 * enums for column ipCidrRouteType 
 */
#define IPCIDRROUTETYPE_OTHER		1
#define IPCIDRROUTETYPE_REJECT		2
#define IPCIDRROUTETYPE_LOCAL		3
#define IPCIDRROUTETYPE_REMOTE		4

/*
 * enums for column ipCidrRouteProto 
 */
#define IPCIDRROUTEPROTO_OTHER		1
#define IPCIDRROUTEPROTO_LOCAL		2
#define IPCIDRROUTEPROTO_NETMGMT		3
#define IPCIDRROUTEPROTO_ICMP		4
#define IPCIDRROUTEPROTO_EGP		5
#define IPCIDRROUTEPROTO_GGP		6
#define IPCIDRROUTEPROTO_HELLO		7
#define IPCIDRROUTEPROTO_RIP		8
#define IPCIDRROUTEPROTO_ISIS		9
#define IPCIDRROUTEPROTO_ESIS		10
#define IPCIDRROUTEPROTO_CISCOIGRP		11
#define IPCIDRROUTEPROTO_BBNSPFIGP		12
#define IPCIDRROUTEPROTO_OSPF		13
#define IPCIDRROUTEPROTO_BGP		14
#define IPCIDRROUTEPROTO_IDPR		15
#define IPCIDRROUTEPROTO_CISCOEIGRP		16

/*
 * enums for column ipCidrRouteStatus 
 */
#define IPCIDRROUTESTATUS_ACTIVE		1
#define IPCIDRROUTESTATUS_NOTINSERVICE		2
#define IPCIDRROUTESTATUS_NOTREADY		3
#define IPCIDRROUTESTATUS_CREATEANDGO		4
#define IPCIDRROUTESTATUS_CREATEANDWAIT		5
#define IPCIDRROUTESTATUS_DESTROY		6

#endif                          /* IPCIDRROUTETABLE_ENUMS_H */
