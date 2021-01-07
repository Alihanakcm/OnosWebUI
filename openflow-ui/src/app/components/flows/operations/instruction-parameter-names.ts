export class InstructionParameterName {

    static getParameterName(type: string): any {
        switch (type) {
            case "OUTPUT": return ["Port", "Ex: CONTROLLER"]; 
            case "TABLE": return ["Table Id", "Ex: 1"]; 
            case "GROUP": return ["Group Id", "Ex: 1"]; 
            case "METER": return ["Meter Id", "Ex: 1"]; 
            case "QUEUE": return ["Queue Id", "Port", "Ex: 1", "Ex: 2"]; 
            case "LAMBDA": return ["Lambda", "Ex: 1"]; 
            case "OCH": return ["Grid Type", "Channel Spacing", "Spacing Multiplier", "Slot Granularity", "Ex: DWDM", "Ex: 1", "Ex: 1", "Ex: 1"]; 
            case "L1MODIFICATION": return ["Sub Type", "Tributary Port Number", "Tributary Slot Length", "Tributary Slot BitMap", "Ex: ODU_SIGID","Ex: 1", "Ex: 1"]; 
            case "VLAN_PUSH": return ""; 
            case "VLAN_ID": return ["VLAN ID", "Ex: 200"]; 
            case "VLAN_PCP": return ["VLAN PCP", "Ex: 0"]; 
            case "ETH_SRC": return ["MAC", "Ex: 00:00:00:00:01"]; 
            case "ETH_DST": return ["MAC", "Ex: 00:00:00:00:01"]; 
            case "MPLS_LABEL": return ["Label", "Ex: 1"]; 
            case "MPLS_PUSH": return ["Ethernet Type", "Ex: 1"]; 
            case "TUNNEL_ID": return ["Tunnel Id", "Ex: 1"]; 
            case "IPV4_SRC": return ["IP", "Ex: 1.1.1.1"]; 
            case "IPV4_DST": return ["IP", "Ex: 1.1.1.1"]; 
            case "IPV6_SRC": return ["IP", "Ex: 1111::2222"]; 
            case "IPV6_DST": return ["IP", "Ex: 1111::2222"]; 
            case "IPV6_FLABEL": return ["Flow Label", "Ex: 1"]; 
            case "TCP_SRC": return ["TCP Port", "Ex: 1"]; 
            case "UDP_SRC": return ["UDP Port", "Ex: 1"]; 
            default: ""
                
        }
    }
}


