export class CriteriaParameterName {
    static getParameterName(type: string): any {
        switch (type) {
            case "ETH_TYPE": return ["ETHERNET TYPE", "Ex: 0x88cc"];
            case "ETH_DST": return ["MAC", "Ex: 00:00:11:00:00:01"];
            case "ETH_SRC": return ["MAC", "Ex: 00:00:11:00:00:01"];
            case "IN_PORT": return ["PORT", "Ex: 1"];
            case "IN_PHY_PORT": return ["PORT", "Ex: 1"];
            case "METADATA": return ["METADATA", "Ex: 0x1000"];
            case "VLAN_ID": return ["VLAN ID", "Ex: 1"];
            case "VLAN_PCP": return ["PRIORITY", "Ex: 1"];
            case "INNER_VLAN_ID": return ["INNER VLAN ID", "Ex: 1"];
            case "INNER_VLAN_PCP": return ["INNER PRIORITY", "Ex: 1"];
            case "IP_DSCP": return ["IP DSCP", "Ex: 1"];
            case "IP_ECN": return ["IP ECN", "Ex: 1"];
            case "IP_PROTO": return ["PROTOCOL", "Ex: 1"];
            case "IPV4_SRC": return ["IP", "Ex: 10.1.1.0/24"];
            case "IPV4_DST": return ["IP", "Ex: 10.1.1.0/24"];
            case "TCP_SRC": return ["TCP PORT", "Ex: 1"];
            case "TCP_DST": return ["TCP PORT", "Ex: 1"];
            case "UDP_SRC": return ["UDP PORT", "Ex: 1"];
            case "UDP_DST": return ["UDP PORT", "Ex: 1"];
            case "SCTP_SRC": return ["SCTP PORT", "Ex: 1"];
            case "SCTP_DST": return ["SCTP PORT", "Ex: 1"];
            case "ICMPV4_TYPE": return ["ICMP PORT", "Ex: 1"];
            case "ICMPV4_CODE": return ["ICMP PORT", "Ex: 1"];
            case "IPV6_SRC": return ["IP", "Ex: 1111::2222/64"];
            case "IPV6_DST": return ["IP", "Ex: 1111::2222/64"];
            case "IPV6_FLABEL": return ["FLOW LABEL", "Ex: 1"];
            case "ICMPV6_TYPE": return ["ICMPV6 TYPE", "Ex: 1"];
            case "ICMPV6_CODE": return ["ICMPV6 TYPE", "Ex: 1"];
            case "IPV6_ND_TARGET": return ["TARGET ADDRESS", "Ex: 1111::2222"];
            case "IPV6_ND_SLL": return ["MAC", "Ex: 00:00:11:00:00:01"];
            case "IPV6_ND_TLL": return ["MAC", "Ex: 00:00:11:00:00:01"];
            case "MPLS_LABEL": return ["LABEL", "Ex: 1"];
            case "IPV6_EXTHDR": return ["EXTHDR FLAGS", "Ex: 1"];
            case "OCH_SIGID": return ["LAMBDA", "Ex: 1"];
            case "GRID_TYPE": return ["GRID TYPE", "Ex: DWDM"];
            case "CHANNEL_SPACING": return ["CHANNEL SPACING", "Ex: 100"];
            case "SPACING_MULIPLIER": return ["SPACING MULTIPLIER", "Ex: 4"];
            case "SLOT_GRANULARITY": return ["SLOT GRANULARITY", "Ex: 8"];
            case "OCH_SIGID": return ["OCH SIGNAL ID", "Ex: 1"];
            case "TUNNEL_ID": return ["TUNNEL ID", "Ex: 5"];
            case "OCH_SIGTYPE": return ["OCH SIGNAL TYPE", "Ex: 1"];
            case "ODU_SIGID": return ["MAC", "TRIBUTARY PORT NUMBER", "TRIBUTARY SLOT BITMAP", "TYPE", "TRIBUTARY SLOT LENGTH", "Ex: 1", "Ex: 11", "Ex: bitmap", "Ex: ETH_TYPE", "Ex: 1"];
            case "ODU_SIGTYPE": return ["ODU SIGNAL TYPE", "Ex: 4"];

            default: null;

        }
    }
}