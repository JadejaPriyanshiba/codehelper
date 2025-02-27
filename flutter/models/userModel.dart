
class User{
    final String _id;
    final String name;
	final String email;
	final int contact;
	final String desc
    
    const User({
        required this._id,
        required this.name,
		required this.email,
		required this.contact,
		required this.desc
    });
    
    factory User.fromJson(Map<String, dynamic> json) => User(
        _id: json['_id'],
        name: json['name'],
		email: json['email'],
		contact: json['contact'],
		desc: json['desc']
    );

    Map<String, dynamic> toJson() => {
        '_id': _id,
        'name': name,
		'email': email,
		'contact': contact,
		'desc': desc
        // if a list
        // "list": List<dynamic>.from(list.map((x) => x.toJson())),
    };
}