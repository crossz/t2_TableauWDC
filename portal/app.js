function copyEvent(id)
{
    var strToCopy = document.getElementById(id);
    strToCopy.select();
    navigator.clipboard.writeText(strToCopy.placeholder);
    alert("Copied");
};